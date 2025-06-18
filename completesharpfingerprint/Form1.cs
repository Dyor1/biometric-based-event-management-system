using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using DPFP;
using DPFP.Capture;
using DPFP.Processing;
using Newtonsoft.Json;
using System.Media;

namespace completesharpfingerprint
{
    public partial class Form1 : Form, DPFP.Capture.EventHandler
    {
        private DPFP.Capture.Capture Capturer;
        private FeatureSet Features;
        private Enrollment enrollment = new Enrollment();
        private int sampleCount = 0;
        private const int RequiredSamples = 4;
        private string Mode = "Register";

        private SoundPlayer ding = new SoundPlayer("ding.wav");
        //private Panel panelRegistrationFields;

        public Form1()
        {
            InitializeComponent();
            InitCapture();
        }

        private void InitCapture()
        {
            try
            {
                Capturer = new DPFP.Capture.Capture();
                Capturer.EventHandler = this;
                Console.WriteLine("✅ Scanner initialized.");
            }
            catch
            {
                MessageBox.Show("❌ Cannot initialize fingerprint scanner.");
            }
        }

        public void OnComplete(object capture, string serialNumber, Sample sample)
        {
            if (!ValidateInputs()) return;

            if (Mode == "Register")
            {
                Features = ExtractFeatures(sample, DataPurpose.Enrollment);
                if (Features == null)
                {
                    MessageBox.Show("❌ Bad fingerprint sample.");
                    return;
                }

                enrollment.AddFeatures(Features);
                sampleCount++;
                this.Invoke((MethodInvoker)(() =>
                {
                    progressSamples.Value = Math.Min(sampleCount, RequiredSamples);
                    lblScanProgress.Text = $"Scan Progress: {sampleCount} of 4";
                    ding.Play();
                    ShowFingerprint(sample);
                }));

                if (enrollment.TemplateStatus == Enrollment.Status.Ready)
                {
                    byte[] data = null;
                    enrollment.Template.Serialize(ref data);
                    string encoded = Convert.ToBase64String(data);
                    Register(encoded);
                    enrollment.Clear();
                    sampleCount = 0;
                    this.Invoke((MethodInvoker)(() =>
                    {
                        progressSamples.Value = 0;
                        lblScanProgress.Text = "Scan Progress:";
                        picFingerprint.Image = null;
                    }));
                }
                else
                {
                    this.Invoke((MethodInvoker)(() =>
                    {
                        MessageBox.Show($"📷 Sample {sampleCount} of 4 captured. Scan again.");
                    }));
                }
            }
            else if (Mode == "Check-In")
            {
                Features = ExtractFeatures(sample, DataPurpose.Verification);
                if (Features != null)
                {
                    this.Invoke((MethodInvoker)(() => ShowFingerprint(sample)));
                    CheckIn();
                }
                else
                {
                    this.Invoke((MethodInvoker)(() =>
                    {
                        MessageBox.Show("❌ Poor scan. Try again.");
                    }));
                }
            }
        }

        private bool ValidateInputs()
        {
            if (Mode == "Check-In")
                return true;

            if (string.IsNullOrWhiteSpace(txtName.Text) ||
                string.IsNullOrWhiteSpace(txtEmail.Text) ||
                !(radioMale.Checked || radioFemale.Checked) ||
                string.IsNullOrWhiteSpace(txtPhone.Text) ||
                string.IsNullOrWhiteSpace(txtAddress.Text) ||
                string.IsNullOrWhiteSpace(txtAge.Text))
            {
                MessageBox.Show("❗ Please fill all fields before scanning.");
                return false;
            }

            try
            {
                var addr = new System.Net.Mail.MailAddress(txtEmail.Text);
                if (addr.Address != txtEmail.Text) throw new Exception();
            }
            catch
            {
                MessageBox.Show("❌ Invalid email format.");
                return false;
            }

            return true;
        }

        private FeatureSet ExtractFeatures(Sample sample, DataPurpose purpose)
        {
            var extractor = new FeatureExtraction();
            var result = CaptureFeedback.None;
            var features = new FeatureSet();
            extractor.CreateFeatureSet(sample, purpose, ref result, ref features);
            return result == CaptureFeedback.Good ? features : null;
        }

        private void ShowFingerprint(Sample sample)
        {
            SampleConversion converter = new SampleConversion();
            Bitmap bitmap = null;
            converter.ConvertToPicture(sample, ref bitmap);
            picFingerprint.Image = bitmap;
        }

        public void OnFingerTouch(object capture, string serialNumber) => Console.WriteLine("👉 Finger touched.");
        public void OnFingerGone(object capture, string serialNumber) => Console.WriteLine("👋 Finger removed.");
        public void OnReaderConnect(object capture, string serialNumber) => Console.WriteLine("🔌 Reader connected.");
        public void OnReaderDisconnect(object capture, string serialNumber) => Console.WriteLine("🔌 Reader disconnected.");
        public void OnSampleQuality(object capture, string serialNumber, CaptureFeedback feedback) =>
            Console.WriteLine($"📊 Quality: {feedback}");

        private async void Register(string template)
        {
            var payload = new
            {
                name = txtName.Text,
                email = txtEmail.Text,
                gender = radioMale.Checked ? "Male" : "Female",
                age = int.Parse(txtAge.Text),
                phone = txtPhone.Text,
                address = txtAddress.Text,
                dob = dtpDOB.Value,
                fingerprintTemplate = template
            };

            using (var client = new HttpClient())
            {
                try
                {
                    var json = JsonConvert.SerializeObject(payload);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");
                    var res = await client.PostAsync("http://localhost:5000/api/attendees", content);
                    var result = await res.Content.ReadAsStringAsync();

                    if (!res.IsSuccessStatusCode)
                    {
                        MessageBox.Show("❌ Registration failed:\n" + result);
                    }
                    else
                    {
                        MessageBox.Show("✅ Registered successfully.");
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("❌ Registration error: " + ex.Message);
                }
            }
        }

        private async void CheckIn()
        {
            using (var client = new HttpClient())
            {
                try
                {
                    var res = await client.GetAsync("http://localhost:5000/api/attendees/templates");
                    var json = await res.Content.ReadAsStringAsync();
                    var attendees = JsonConvert.DeserializeObject<List<Attendee>>(json);

                    foreach (var a in attendees)
                    {
                        if (string.IsNullOrWhiteSpace(a.fingerprintTemplate)) continue;
                        if (a.attended) continue;

                        byte[] storedBytes = Convert.FromBase64String(a.fingerprintTemplate);
                        var template = new DPFP.Template();
                        template.DeSerialize(storedBytes);

                        var verifier = new DPFP.Verification.Verification();
                        var result = new DPFP.Verification.Verification.Result();
                        verifier.Verify(Features, template, ref result);

                        if (result.Verified)
                        {
                            await client.PostAsync($"http://localhost:5000/api/attendees/check-in/{a._id}", null);
                            MessageBox.Show($"✅ Welcome {a.name}!");
                            return;
                        }
                    }

                    MessageBox.Show("❌ No match found.");
                }
                catch (Exception ex)
                {
                    MessageBox.Show("❌ Check-in error: " + ex.Message);
                }
            }
        }

        private void btnStart_Click(object sender, EventArgs e)
        {
            if (Mode == "Register" && !ValidateInputs())
                return;

            Capturer?.StartCapture();
            Console.WriteLine("▶️ Started scanning...");
        }

        private void btnStop_Click(object sender, EventArgs e)
        {
            Capturer?.StopCapture();
            Console.WriteLine("⏹️ Stopped scanning.");
        }

        private void radioCheckIn_CheckedChanged(object sender, EventArgs e)
        {
            Mode = "Check-In";
            if (panelRegistrationFields != null)
                panelRegistrationFields.Visible = false;
        }

        private void radioRegister_CheckedChanged(object sender, EventArgs e)
        {
            Mode = "Register";
            if (panelRegistrationFields != null)
                panelRegistrationFields.Visible = true;

            sampleCount = 0;
            enrollment.Clear();
        }

        public class Attendee
        {
            public string _id { get; set; }
            public string name { get; set; }
            public string email { get; set; }
            public string gender { get; set; }
            public int age { get; set; }
            public string phone { get; set; }
            public string address { get; set; }
            public DateTime dob { get; set; }
            public string fingerprintTemplate { get; set; }
            public bool attended { get; set; }
        }

        private void picFingerprint_Click(object sender, EventArgs e)
        {

        }

        private void panelRegistrationFields_Paint(object sender, PaintEventArgs e)
        {

        }
    }
}
