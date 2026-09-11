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


  const [record, setRecord] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const findInstallation = async () => {

      try {

        const q =
          query(
            collection(
              db,
              "installations"
            ),

            where(
              "installationId",
              "==",
              id
            )
          );


        const snapshot =
          await getDocs(q);


        if (!snapshot.empty) {

          setRecord(
            snapshot.docs[0].data()
          );

        }

      } catch (error) {

        console.error(error);

      }


      setLoading(false);

    };


    findInstallation();

  }, [id]);


  if (loading) {

    return (

      <div className="page">

        <div className="details-card">
          Loading installation details...
        </div>

      </div>

    );

  }


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


  return (

    <div className="page details-page">

      <div className="details-card">

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


        <div className="details-list">


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
              👤
              <span>
                Customer Name
              </span>
            </div>

            <strong>
              {record.customerName}
            </strong>

          </div>


          <div className="detail-item">

            <div className="detail-label">
              ⚡
              <span>
                Device Installed
              </span>
            </div>

            <strong>
              {record.deviceInstalled}
            </strong>

          </div>


          <div className="detail-item">

            <div className="detail-label">
              🤝
              <span>
                Referred By
              </span>
            </div>

            <strong>
              {record.referredBy}
            </strong>

          </div>


          <div className="detail-item">

            <div className="detail-label">
              🔧
              <span>
                Technician Name
              </span>
            </div>

            <strong>
              {record.technicianName}
            </strong>

          </div>


          <div className="detail-item">

            <div className="detail-label">
              📱
              <span>
                Mobile Number
              </span>
            </div>

            <strong>
              {record.mobileNumber}
            </strong>

          </div>


        </div>


        <div className="verified">

          ✓ Verified Installation Record

        </div>

      </div>

    </div>

  );
}

export default InstallationDetails;