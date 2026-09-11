import { useState } from "react";

import {
  collection,
  addDoc,
  serverTimestamp
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
 
 
  const [installationId, setInstallationId] = 
    useState(""); 
 
  const [loading, setLoading] = 
    useState(false); 
 
 
  const handleChange = (e) => { 
 
    setForm({ 
      ...form, 
      [e.target.name]: e.target.value 
    }); 
 
  }; 
 
 
  const generateId = () => { 
 
    const number = 
      Math.floor( 
        100000 + 
        Math.random() * 900000 
      ); 
 
    return `HTPS-${number}`; 
 
  }; 
 
 
  const handleSubmit = async (e) => { 
 
    e.preventDefault(); 
 
    setLoading(true); 
 
    try { 
 
      let newId = ""; 
      let idExists = true; 
 
      while (idExists) { 
 
        newId = generateId(); 
 
        const existingRecords = 
          await getDocs( 
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
 
 
      setInstallationId(newId); 
 
 
      setForm({ 
        date: "", 
        customerName: "", 
        deviceInstalled: "", 
        referredBy: "", 
        technicianName: "", 
        mobileNumber: "" 
      }); 
 
 
    } catch (error) { 
 
      console.error(error); 
 
      alert( 
        "Data save failed. Please check Firebase configuration." 
      ); 
 
    } 
 
    setLoading(false); 
 
  }; 
 
 
  const qrUrl = 
    installationId 
      ? `${window.location.origin}/installation/${installationId}` 
      : ""; 
 
 
  const downloadQR = () => { 
 
    const canvas = 
      document.getElementById("installation-qr"); 
 
    if (!canvas) return; 
 
 
    const link = 
      document.createElement("a"); 
 
    link.download = 
      `${installationId}-QR.png`; 
 
    link.href = 
      canvas.toDataURL("image/png"); 
 
    link.click(); 
 
  }; 
 
 
  return ( 
 
    <div className="page"> 
 
      <div className="page-container"> 
 
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
 
 
        <div className="form-card"> 
 
          <form onSubmit={handleSubmit}> 
 
            <div className="form-grid"> 
 
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
 
 
              <div className="form-group"> 
 
                <label> 
                  Mobile Number * 
                </label> 
 
                <input 
                  type="tel" 
                  name="mobileNumber" 
                  placeholder="Enter mobile number" 
                  maxLength="10" 
                  value={form.mobileNumber} 
                  onChange={handleChange} 
                  required 
                /> 
 
              </div> 
 
            </div> 
 
 
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