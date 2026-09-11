import { useEffect } from "react";

import { Html5QrcodeScanner } from "html5-qrcode";

import { useNavigate } from "react-router-dom";


function QRScanner() {

  const navigate = useNavigate();


  useEffect(() => {

    const scanner =
      new Html5QrcodeScanner(
        "qr-reader",

        {
          fps: 10,

          qrbox: {
            width: 250,
            height: 250
          },

          rememberLastUsedCamera: true,

          supportedScanTypes: []
        },

        false
      );


    const success = (decodedText) => {

      scanner.clear()
        .then(() => {

          if (
            decodedText.includes(
              "/installation/"
            )
          ) {

            window.location.href =
              decodedText;

          } else {

            navigate(
              `/installation/${decodedText}`
            );

          }

        })
        .catch(error => {

          console.error(error);

        });

    };


    const error = () => {
      // Scanner continues
    };


    scanner.render(
      success,
      error
    );


    return () => {

      scanner.clear()
        .catch(() => {});

    };

  }, [navigate]);


  return (

    <div className="page">

      <div className="scanner-container">

        <div className="page-heading">

          <span className="small-label">
            QR SCANNER
          </span>

          <h1>
            Scan Installation QR
          </h1>

          <p>
            Point your camera at the installation QR code.
          </p>

        </div>


        <div className="scanner-card">

          <div id="qr-reader"></div>

        </div>


        <div className="scanner-note">

          <strong>
            How to scan
          </strong>

          <p>
            Allow camera permission and place
            the QR code inside the scanning box.
          </p>

        </div>

      </div>

    </div>

  );
}

export default QRScanner;