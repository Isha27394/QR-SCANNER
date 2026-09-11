import { useState } from "react";

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where
} from "firebase/firestore";

import { db } from "../Firebase";

import { QRCodeCanvas } from "qrcode.react";

import { Link } from "react-router-dom";


function AddInstallation() {

  const [form, setForm] = useState({
    date: "",
    customerName: "",
    deviceInstalled: "",
    referredBy: "",
    technicianName: "",
    mobileNumber: ""
  });

  const [installationId, setInstallationId] = useState("");

  const [loading, setLoading] = useState(false);


  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  // =========================
  // GENERATE INSTALLATION ID
  // =========================

  const generateId = () => {

    const number =
      Math.floor(
        100000 + Math.random() * 900000
      );

    return `HTPS-${number}`;

  };


  // =========================
  // SAVE INSTALLATION
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      let newId = "";
      let idExists = true;


      // =========================
      // CHECK UNIQUE INSTALLATION ID
      // =========================

      while (idExists) {

        newId = generateId();

        const existingRecords = await getDocs(
          query(
            collection(db, "installations"),
            where(
              "installationId",
              "==",
              newId
            )
          )
        );

        idExists = !existingRecords.empty;

      }


      // =========================
      // SAVE DATA TO FIRESTORE
      // =========================

      await addDoc(
        collection(db, "installations"),
        {

          installationId: newId,

          date: form.date,

          customerName:
            form.customerName.trim(),

          deviceInstalled:
            form.deviceInstalled.trim(),

          referredBy:
            form.referredBy.trim(),

          technicianName:
            form.technicianName.trim(),

          mobileNumber:
            form.mobileNumber.trim(),

          createdAt:
            serverTimestamp()

        }
      );


      // =========================
      // SUCCESS
      // =========================

      setInstallationId(newId);


      setForm({
        date: "",
        customerName: "",
        deviceInstalled: "",
        referredBy: "",
        technicianName: "",
        mobileNumber: ""
      });


      alert(
        `Installation saved successfully!\n\nInstallation ID: ${newId}`
      );


    } catch (error) {

      console.error(
        "FIREBASE ERROR:",
        error
      );


      // Show exact error

      alert(
        "Data save failed!\n\n" +
        "Error Code: " +
        (error.code || "Unknown") +
        "\n\n" +
        "Error Message: " +
        (error.message || error)
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // QR URL
  // =========================

  const qrUrl =
    installationId
      ? `${window.location.origin}/installation/${installationId}`
      : "";


  // =========================
  // DOWNLOAD QR
  // =========================

  const downloadQR = () => {

    const canvas =
      document.getElementById(
        "installation-qr"
      );

    if (!canvas) {

      alert("QR code not found.");

      return;

    }


    const link =
      document.createElement("a");


    link.download =
      `${installationId}-QR.png`;


    link.href =
      canvas.toDataURL("image/png");


    link.click();

  };


  // =========================
  // UI
  // =========================

  return (

    <div className="page">

      <div className="page-container">


        {/* PAGE HEADING */}

        <div className="page-heading">

          <span className="small-label">
            INSTALLATION MANAGEMENT
          </span>

          <h1>
            Add New Installation
          </h1>

          <p>
            Enter the device installation details below.
          </p>

        </div>


        {/* FORM CARD */}

        <div className="form-card">

          <form onSubmit={handleSubmit}>

            <div className="form-grid">


              {/* DATE */}

              <div className="form-group">

                <label>
                  Installation Date *
                </label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* CUSTOMER */}

              <div className="form-group">

                <label>
                  Customer Name *
                </label>

                <input
                  type="text"
                  name="customerName"
                  placeholder="Enter customer name"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* DEVICE */}

              <div className="form-group">

                <label>
                  Device Installed *
                </label>

                <input
                  type="text"
                  name="deviceInstalled"
                  placeholder="Example: HTPS 10 KVA"
                  value={form.deviceInstalled}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* REFERRED BY */}

              <div className="form-group">

                <label>
                  Referred By *
                </label>

                <input
                  type="text"
                  name="referredBy"
                  placeholder="Enter referral name"
                  value={form.referredBy}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* TECHNICIAN */}

              <div className="form-group">

                <label>
                  Technician Name *
                </label>

                <input
                  type="text"
                  name="technicianName"
                  placeholder="Enter technician name"
                  value={form.technicianName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* MOBILE */}

              <div className="form-group">

                <label>
                  Mobile Number *
                </label>

                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Enter mobile number"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  value={form.mobileNumber}
                  onChange={handleChange}
                  required
                />

              </div>


            </div>


            {/* SAVE BUTTON */}

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >

              {loading
                ? "Saving..."
                : "✓ Save Installation"}

            </button>


          </form>


          {/* QR SUCCESS */}

          {installationId && (

            <div className="qr-success">

              <div className="success-icon">
                ✓
              </div>

              <h2>
                Installation Saved Successfully
              </h2>

              <p>
                Your unique Installation ID is
              </p>

              <div className="installation-id">
                {installationId}
              </div>


              <div className="qr-container">

                <QRCodeCanvas
                  id="installation-qr"
                  value={qrUrl}
                  size={240}
                  level="H"
                  includeMargin={true}
                />

              </div>


              <p className="scan-text">
                Scan this QR code to view
                complete installation details.
              </p>


              <div className="qr-buttons">

                <button
                  type="button"
                  className="download-btn"
                  onClick={downloadQR}
                >
                  ↓ Download QR
                </button>


                <Link
                  className="view-btn"
                  to={`/installation/${installationId}`}
                >
                  View Details
                </Link>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}


export default AddInstallation;