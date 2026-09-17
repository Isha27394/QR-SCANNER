import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

import { db } from "../Firebase";

import { useParams, Link } from "react-router-dom";


function InstallationDetails() {

  const { id } = useParams();

  const [record, setRecord] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const findInstallation = async () => {

      try {

        const q = query(
          collection(db, "installations"),
          where("installationId", "==", id)
        );


        const snapshot = await getDocs(q);


        if (!snapshot.empty) {

          setRecord(
            snapshot.docs[0].data()
          );

        }

      } catch (error) {

        console.error("Installation Details Error:", error);

      }


      setLoading(false);

    };


    findInstallation();

  }, [id]);


  // =====================================================
  // DATE CALCULATION
  // =====================================================

  const calculateDate = (installationDate, years) => {

    if (!installationDate) {
      return "Not Available";
    }

    const date = new Date(installationDate);

    if (isNaN(date.getTime())) {
      return "Not Available";
    }

    date.setFullYear(
      date.getFullYear() + years
    );

    // Valid until one day before anniversary
    date.setDate(date.getDate() - 1);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="page">

        <div className="details-card">

          Loading installation details...

        </div>

      </div>

    );

  }


  // =====================================================
  // NOT FOUND
  // =====================================================

  if (!record) {

    return (

      <div className="page">

        <div className="details-card not-found">

          <div className="not-found-icon">
            !
          </div>

          <h1>
            Installation Not Found
          </h1>

          <p>
            This QR code does not match
            any installation record.
          </p>

          <Link
            to="/"
            className="primary-btn"
          >
            Go Home
          </Link>

        </div>

      </div>

    );

  }


  // =====================================================
  // CALCULATED DATES
  // =====================================================

  const replacementDate =
    calculateDate(
      record.date,
      2
    );


  const deviceLifeDate =
    calculateDate(
      record.date,
      5
    );


  // =====================================================
  // RETURN
  // =====================================================

  return (

    <div className="page details-page">

      <div className="details-card">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="details-header">

          <div className="company-symbol">
            ⚡
          </div>

          <span>
            HI-TECH POWER SAVER
          </span>

          <h1>
            Installation Details
          </h1>

          <div className="details-id">
            {record.installationId}
          </div>

        </div>


        {/* =================================================
            DEVICE VALIDITY
        ================================================= */}

        <div className="validity-section">


          <div className="validity-card replacement-card">

            <div className="validity-icon">
              🔄
            </div>

            <div>

              <span>
                2 YEARS REPLACEMENT
              </span>

              <strong>
                {replacementDate}
              </strong>

              <small>
                Replacement valid until
              </small>

            </div>

          </div>


          <div className="validity-card life-card">

            <div className="validity-icon">
              ⚡
            </div>

            <div>

              <span>
                5 YEARS DEVICE LIFE
              </span>

              <strong>
                {deviceLifeDate}
              </strong>

              <small>
                Expected device life until
              </small>

            </div>

          </div>


        </div>


        {/* =================================================
            CUSTOMER DETAILS
        ================================================= */}

        <div className="section-title">
          👤 Customer Information
        </div>


        <div className="details-list">


          <div className="detail-item">

            <div className="detail-label">
              👤
              <span>
                Customer Name
              </span>
            </div>

            <strong>
              {record.customerName || "Not Available"}
            </strong>

          </div>


          <div className="detail-item">

            <div className="detail-label">
              📱
              <span>
                Customer Contact
              </span>
            </div>

            <strong>
              {record.mobileNumber || "Not Available"}
            </strong>

          </div>


          <div className="detail-item full-width">

            <div className="detail-label">
              📍
              <span>
                Customer Address
              </span>
            </div>

            <strong>
              {record.customerAddress || "Not Available"}
            </strong>

          </div>


        </div>


        {/* =================================================
            DEVICE DETAILS
        ================================================= */}

        <div className="section-title">
          ⚡ Device Information
        </div>


        <div className="details-list">


          <div className="detail-item">

            <div className="detail-label">
              🆔
              <span>
                Installation ID
              </span>
            </div>

            <strong>
              {record.installationId}
            </strong>

          </div>


          <div className="detail-item">

            <div className="detail-label">
              📅
              <span>
                Installation Date
              </span>
            </div>

            <strong>
              {record.date}
            </strong>

          </div>


          <div className="detail-item">

            <div className="detail-label">
              ⚡
              <span>
                Device / Model
              </span>
            </div>

            <strong>
              {record.deviceInstalled || "Not Available"}
            </strong>

          </div>


          <div className="detail-item">

            <div className="detail-label">
              🔢
              <span>
                Device Serial Number
              </span>
            </div>

            <strong>
              {record.deviceSerialNumber || "Not Available"}
            </strong>

          </div>


        </div>


        {/* =================================================
            REFERENCE DETAILS
        ================================================= */}

        <div className="section-title">
          🤝 Reference Information
        </div>


        <div className="details-list">


          <div className="detail-item">

            <div className="detail-label">
              👥
              <span>
                Referred By
              </span>
            </div>

            <strong>
              {record.referredBy || "Direct Customer"}
            </strong>

          </div>


          <div className="detail-item">

            <div className="detail-label">
              📞
              <span>
                Reference Contact
              </span>
            </div>

            <strong>
              {record.referredByContact || "Not Available"}
            </strong>

          </div>


          <div className="detail-item">

            <div className="detail-label">
              🏢
              <span>
                Company Contact
              </span>
            </div>

            <strong>
              {record.companyContact || "Not Available"}
            </strong>

          </div>


        </div>


        {/* =================================================
            TECHNICIAN DETAILS
        ================================================= */}

        <div className="section-title">
          🔧 Installation Team
        </div>


        <div className="details-list">


          <div className="detail-item">

            <div className="detail-label">
              🔧
              <span>
                Technician Name
              </span>
            </div>

            <strong>
              {record.technicianName || "Not Available"}
            </strong>

          </div>


          <div className="detail-item">

            <div className="detail-label">
              📱
              <span>
                Technician Contact
              </span>
            </div>

            <strong>
              {record.technicianMobile || "Not Available"}
            </strong>

          </div>


        </div>


        {/* =================================================
            VERIFIED
        ================================================= */}

        <div className="verified">

          ✓ Verified Installation Record

        </div>


      </div>

    </div>

  );

}


export default InstallationDetails;