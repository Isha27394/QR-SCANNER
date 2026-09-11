import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../Firebase";

import { Link } from "react-router-dom";


function Records() {

  const [records, setRecords] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);


  const fetchRecords = async () => {

    try {

      const snapshot =
        await getDocs(
          collection(db, "installations")
        );


      const data =
        snapshot.docs.map(doc => ({
          firebaseId: doc.id,
          ...doc.data()
        }));


      data.sort(
        (a, b) =>
          (b.createdAt?.seconds || 0) -
          (a.createdAt?.seconds || 0)
      );


      setRecords(data);

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

  };


  useEffect(() => {

    fetchRecords();

  }, []);


  const filteredRecords =
    records.filter(record => {

      const text =
        search.toLowerCase();

      return (

        record.installationId
          ?.toLowerCase()
          .includes(text)

        ||

        record.customerName
          ?.toLowerCase()
          .includes(text)

        ||

        record.technicianName
          ?.toLowerCase()
          .includes(text)

      );

    });


  return (

    <div className="page">

      <div className="page-container">

        <div className="page-heading">

          <span className="small-label">
            DATABASE
          </span>

          <h1>
            Installation Records
          </h1>

          <p>
            View all registered device installations.
          </p>

        </div>


        <div className="search-box">

          <input
            type="text"
            placeholder="Search by ID, customer or technician..."
            value={search}
            onChange={
              e => setSearch(e.target.value)
            }
          />

        </div>


        {loading ? (

          <div className="loading">
            Loading records...
          </div>

        ) : filteredRecords.length === 0 ? (

          <div className="empty">

            <h2>
              No Records Found
            </h2>

            <p>
              No installation records are available.
            </p>

          </div>

        ) : (

          <div className="records-grid">

            {filteredRecords.map(record => (

              <div
                className="record-card"
                key={record.firebaseId}
              >

                <div className="record-top">

                  <span className="record-id">
                    {record.installationId}
                  </span>

                  <span className="record-date">
                    {record.date}
                  </span>

                </div>


                <h2>
                  {record.customerName}
                </h2>


                <div className="record-detail">

                  <span>
                    Device
                  </span>

                  <strong>
                    {record.deviceInstalled}
                  </strong>

                </div>


                <div className="record-detail">

                  <span>
                    Referred By
                  </span>

                  <strong>
                    {record.referredBy}
                  </strong>

                </div>


                <div className="record-detail">

                  <span>
                    Technician
                  </span>

                  <strong>
                    {record.technicianName}
                  </strong>

                </div>


                <div className="record-detail">

                  <span>
                    Mobile
                  </span>

                  <strong>
                    {record.mobileNumber}
                  </strong>

                </div>


                <Link
                  to={`/installation/${record.installationId}`}
                  className="details-btn"
                >
                  View Complete Details →
                </Link>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default Records;