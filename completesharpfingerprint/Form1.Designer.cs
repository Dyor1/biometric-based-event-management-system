using System.Windows.Forms;

namespace completesharpfingerprint
{
    partial class Form1
    {
        private System.ComponentModel.IContainer components = null;

        private Label lblTitle;
        private GroupBox groupBoxMode;
        private RadioButton radioRegister;
        private RadioButton radioCheckIn;
        private TextBox txtName;
        private TextBox txtEmail;
        private TextBox txtAge;
        private TextBox txtPhone;
        private TextBox txtAddress;
        private DateTimePicker dtpDOB;
        private Button btnStart;
        private Button btnStop;
        private Label lblName;
        private Label lblEmail;
        private Label lblGender;
        private Label lblAge;
        private Label lblPhone;
        private Label lblAddress;
        private Label lblDOB;
        private ProgressBar progressSamples;
        private Label lblScanProgress;
        private PictureBox picFingerprint;
        private Panel panelRegistrationFields;

        private GroupBox groupGender;
        private RadioButton radioMale;
        private RadioButton radioFemale;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null)) components.Dispose();
            base.Dispose(disposing);
        }

        private void InitializeComponent()
        {
            this.lblTitle = new System.Windows.Forms.Label();
            this.groupBoxMode = new System.Windows.Forms.GroupBox();
            this.radioRegister = new System.Windows.Forms.RadioButton();
            this.radioCheckIn = new System.Windows.Forms.RadioButton();
            this.panelRegistrationFields = new System.Windows.Forms.Panel();
            this.lblName = new System.Windows.Forms.Label();
            this.txtName = new System.Windows.Forms.TextBox();
            this.lblEmail = new System.Windows.Forms.Label();
            this.txtEmail = new System.Windows.Forms.TextBox();
            this.lblGender = new System.Windows.Forms.Label();
            this.groupGender = new System.Windows.Forms.GroupBox();
            this.radioMale = new System.Windows.Forms.RadioButton();
            this.radioFemale = new System.Windows.Forms.RadioButton();
            this.lblAge = new System.Windows.Forms.Label();
            this.txtAge = new System.Windows.Forms.TextBox();
            this.lblPhone = new System.Windows.Forms.Label();
            this.txtPhone = new System.Windows.Forms.TextBox();
            this.lblAddress = new System.Windows.Forms.Label();
            this.txtAddress = new System.Windows.Forms.TextBox();
            this.lblDOB = new System.Windows.Forms.Label();
            this.dtpDOB = new System.Windows.Forms.DateTimePicker();
            this.btnStart = new System.Windows.Forms.Button();
            this.btnStop = new System.Windows.Forms.Button();
            this.progressSamples = new System.Windows.Forms.ProgressBar();
            this.lblScanProgress = new System.Windows.Forms.Label();
            this.picFingerprint = new System.Windows.Forms.PictureBox();
            this.groupBoxMode.SuspendLayout();
            this.panelRegistrationFields.SuspendLayout();
            this.groupGender.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.picFingerprint)).BeginInit();
            this.SuspendLayout();
            // 
            // lblTitle
            // 
            this.lblTitle.AutoSize = true;
            this.lblTitle.Font = new System.Drawing.Font("Segoe UI", 14F, System.Drawing.FontStyle.Bold);
            this.lblTitle.Location = new System.Drawing.Point(25, 10);
            this.lblTitle.Name = "lblTitle";
            this.lblTitle.Size = new System.Drawing.Size(315, 32);
            this.lblTitle.TabIndex = 0;
            this.lblTitle.Text = "🛡️ Event Biometric System";
            // 
            // groupBoxMode
            // 
            this.groupBoxMode.Controls.Add(this.radioRegister);
            this.groupBoxMode.Controls.Add(this.radioCheckIn);
            this.groupBoxMode.Location = new System.Drawing.Point(25, 50);
            this.groupBoxMode.Name = "groupBoxMode";
            this.groupBoxMode.Size = new System.Drawing.Size(250, 60);
            this.groupBoxMode.TabIndex = 1;
            this.groupBoxMode.TabStop = false;
            this.groupBoxMode.Text = "Mode";
            // 
            // radioRegister
            // 
            this.radioRegister.Checked = true;
            this.radioRegister.Location = new System.Drawing.Point(10, 25);
            this.radioRegister.Name = "radioRegister";
            this.radioRegister.Size = new System.Drawing.Size(104, 24);
            this.radioRegister.TabIndex = 0;
            this.radioRegister.TabStop = true;
            this.radioRegister.Text = "Register";
            this.radioRegister.CheckedChanged += new System.EventHandler(this.radioRegister_CheckedChanged);
            // 
            // radioCheckIn
            // 
            this.radioCheckIn.Location = new System.Drawing.Point(130, 25);
            this.radioCheckIn.Name = "radioCheckIn";
            this.radioCheckIn.Size = new System.Drawing.Size(104, 24);
            this.radioCheckIn.TabIndex = 1;
            this.radioCheckIn.Text = "Check-In";
            this.radioCheckIn.CheckedChanged += new System.EventHandler(this.radioCheckIn_CheckedChanged);
            // 
            // panelRegistrationFields
            // 
            this.panelRegistrationFields.Controls.Add(this.lblName);
            this.panelRegistrationFields.Controls.Add(this.txtName);
            this.panelRegistrationFields.Controls.Add(this.lblEmail);
            this.panelRegistrationFields.Controls.Add(this.txtEmail);
            this.panelRegistrationFields.Controls.Add(this.lblGender);
            this.panelRegistrationFields.Controls.Add(this.groupGender);
            this.panelRegistrationFields.Controls.Add(this.lblAge);
            this.panelRegistrationFields.Controls.Add(this.txtAge);
            this.panelRegistrationFields.Controls.Add(this.lblPhone);
            this.panelRegistrationFields.Controls.Add(this.txtPhone);
            this.panelRegistrationFields.Controls.Add(this.lblAddress);
            this.panelRegistrationFields.Controls.Add(this.txtAddress);
            this.panelRegistrationFields.Controls.Add(this.lblDOB);
            this.panelRegistrationFields.Controls.Add(this.dtpDOB);
            this.panelRegistrationFields.Location = new System.Drawing.Point(25, 120);
            this.panelRegistrationFields.Name = "panelRegistrationFields";
            this.panelRegistrationFields.Size = new System.Drawing.Size(400, 296);
            this.panelRegistrationFields.TabIndex = 2;
            this.panelRegistrationFields.Paint += new System.Windows.Forms.PaintEventHandler(this.panelRegistrationFields_Paint);
            // 
            // lblName
            // 
            this.lblName.Location = new System.Drawing.Point(10, 10);
            this.lblName.Name = "lblName";
            this.lblName.Size = new System.Drawing.Size(100, 23);
            this.lblName.TabIndex = 0;
            this.lblName.Text = "Full Name:";
            // 
            // txtName
            // 
            this.txtName.Location = new System.Drawing.Point(130, 10);
            this.txtName.Name = "txtName";
            this.txtName.Size = new System.Drawing.Size(200, 22);
            this.txtName.TabIndex = 1;
            // 
            // lblEmail
            // 
            this.lblEmail.Location = new System.Drawing.Point(10, 42);
            this.lblEmail.Name = "lblEmail";
            this.lblEmail.Size = new System.Drawing.Size(100, 23);
            this.lblEmail.TabIndex = 2;
            this.lblEmail.Text = "Email:";
            // 
            // txtEmail
            // 
            this.txtEmail.Location = new System.Drawing.Point(130, 40);
            this.txtEmail.Name = "txtEmail";
            this.txtEmail.Size = new System.Drawing.Size(200, 22);
            this.txtEmail.TabIndex = 3;
            // 
            // lblGender
            // 
            this.lblGender.Location = new System.Drawing.Point(10, 82);
            this.lblGender.Name = "lblGender";
            this.lblGender.Size = new System.Drawing.Size(100, 23);
            this.lblGender.TabIndex = 4;
            this.lblGender.Text = "Gender:";
            // 
            // groupGender
            // 
            this.groupGender.Controls.Add(this.radioMale);
            this.groupGender.Controls.Add(this.radioFemale);
            this.groupGender.Location = new System.Drawing.Point(130, 67);
            this.groupGender.Name = "groupGender";
            this.groupGender.Size = new System.Drawing.Size(227, 42);
            this.groupGender.TabIndex = 5;
            this.groupGender.TabStop = false;
            // 
            // radioMale
            // 
            this.radioMale.Location = new System.Drawing.Point(10, 15);
            this.radioMale.Name = "radioMale";
            this.radioMale.Size = new System.Drawing.Size(104, 24);
            this.radioMale.TabIndex = 0;
            this.radioMale.Text = "Male";
            // 
            // radioFemale
            // 
            this.radioFemale.Location = new System.Drawing.Point(119, 15);
            this.radioFemale.Name = "radioFemale";
            this.radioFemale.Size = new System.Drawing.Size(104, 24);
            this.radioFemale.TabIndex = 1;
            this.radioFemale.Text = "Female";
            // 
            // lblAge
            // 
            this.lblAge.Location = new System.Drawing.Point(10, 115);
            this.lblAge.Name = "lblAge";
            this.lblAge.Size = new System.Drawing.Size(100, 23);
            this.lblAge.TabIndex = 6;
            this.lblAge.Text = "Age:";
            // 
            // txtAge
            // 
            this.txtAge.Location = new System.Drawing.Point(130, 115);
            this.txtAge.Name = "txtAge";
            this.txtAge.Size = new System.Drawing.Size(200, 22);
            this.txtAge.TabIndex = 7;
            // 
            // lblPhone
            // 
            this.lblPhone.Location = new System.Drawing.Point(10, 149);
            this.lblPhone.Name = "lblPhone";
            this.lblPhone.Size = new System.Drawing.Size(100, 23);
            this.lblPhone.TabIndex = 8;
            this.lblPhone.Text = "Phone:";
            // 
            // txtPhone
            // 
            this.txtPhone.Location = new System.Drawing.Point(130, 145);
            this.txtPhone.Name = "txtPhone";
            this.txtPhone.Size = new System.Drawing.Size(200, 22);
            this.txtPhone.TabIndex = 9;
            // 
            // lblAddress
            // 
            this.lblAddress.Location = new System.Drawing.Point(10, 175);
            this.lblAddress.Name = "lblAddress";
            this.lblAddress.Size = new System.Drawing.Size(100, 23);
            this.lblAddress.TabIndex = 10;
            this.lblAddress.Text = "Address:";
            // 
            // txtAddress
            // 
            this.txtAddress.Location = new System.Drawing.Point(130, 175);
            this.txtAddress.Name = "txtAddress";
            this.txtAddress.Size = new System.Drawing.Size(200, 22);
            this.txtAddress.TabIndex = 11;
            // 
            // lblDOB
            // 
            this.lblDOB.Location = new System.Drawing.Point(10, 205);
            this.lblDOB.Name = "lblDOB";
            this.lblDOB.Size = new System.Drawing.Size(100, 23);
            this.lblDOB.TabIndex = 12;
            this.lblDOB.Text = "Date of Birth:";
            // 
            // dtpDOB
            // 
            this.dtpDOB.Location = new System.Drawing.Point(130, 205);
            this.dtpDOB.Name = "dtpDOB";
            this.dtpDOB.Size = new System.Drawing.Size(200, 22);
            this.dtpDOB.TabIndex = 13;
            // 
            // btnStart
            // 
            this.btnStart.Location = new System.Drawing.Point(25, 447);
            this.btnStart.Name = "btnStart";
            this.btnStart.Size = new System.Drawing.Size(75, 23);
            this.btnStart.TabIndex = 3;
            this.btnStart.Text = "▶ Start Scan";
            this.btnStart.Click += new System.EventHandler(this.btnStart_Click);
            // 
            // btnStop
            // 
            this.btnStop.Location = new System.Drawing.Point(150, 447);
            this.btnStop.Name = "btnStop";
            this.btnStop.Size = new System.Drawing.Size(75, 23);
            this.btnStop.TabIndex = 4;
            this.btnStop.Text = "⏹ Stop Scan";
            this.btnStop.Click += new System.EventHandler(this.btnStop_Click);
            // 
            // progressSamples
            // 
            this.progressSamples.Location = new System.Drawing.Point(150, 487);
            this.progressSamples.Maximum = 4;
            this.progressSamples.Name = "progressSamples";
            this.progressSamples.Size = new System.Drawing.Size(200, 20);
            this.progressSamples.TabIndex = 5;
            // 
            // lblScanProgress
            // 
            this.lblScanProgress.Location = new System.Drawing.Point(25, 487);
            this.lblScanProgress.Name = "lblScanProgress";
            this.lblScanProgress.Size = new System.Drawing.Size(100, 23);
            this.lblScanProgress.TabIndex = 6;
            this.lblScanProgress.Text = "Scan Progress:";
            // 
            // picFingerprint
            // 
            this.picFingerprint.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.picFingerprint.Location = new System.Drawing.Point(484, 33);
            this.picFingerprint.Name = "picFingerprint";
            this.picFingerprint.Size = new System.Drawing.Size(120, 140);
            this.picFingerprint.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.picFingerprint.TabIndex = 7;
            this.picFingerprint.TabStop = false;
            this.picFingerprint.Click += new System.EventHandler(this.picFingerprint_Click);
            // 
            // Form1
            // 
            this.ClientSize = new System.Drawing.Size(666, 587);
            this.Controls.Add(this.lblTitle);
            this.Controls.Add(this.groupBoxMode);
            this.Controls.Add(this.panelRegistrationFields);
            this.Controls.Add(this.btnStart);
            this.Controls.Add(this.btnStop);
            this.Controls.Add(this.progressSamples);
            this.Controls.Add(this.lblScanProgress);
            this.Controls.Add(this.picFingerprint);
            this.Name = "Form1";
            this.Text = "Fingerprint Attendee System";
            this.groupBoxMode.ResumeLayout(false);
            this.panelRegistrationFields.ResumeLayout(false);
            this.panelRegistrationFields.PerformLayout();
            this.groupGender.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.picFingerprint)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }
    }
}
