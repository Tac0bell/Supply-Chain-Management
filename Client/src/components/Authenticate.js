import React, { useRef, useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import QrScanner from 'qr-scanner'

import "../css/Authenticate.css";
const Authenticate = ({ account }) => {
 
  const [message, setMessage] = useState("");
  const [file,setFile] = useState(null)
  const fileRef = useRef();

  // const handleClick=()=>{
  //   fileRef.current.click();
  // };
  const handleqr= async(result)=>{
    if (!!result ) {
      let data = JSON.parse(result);
      if (data.hash) {
        let res = await axios.get(
          `https://api-goerli.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${data.hash}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
        );
        
        if (res) {
          setMessage("Product is Authenticated ✅");
          
        }
      }
    }
    else{
      setMessage("Error")
    }
  }
  const handleChange= async(e)=>{
    const file=e.target.files[0];
    setFile(file)
    const result = await QrScanner.scanImage(file)
    let data = JSON.parse(result);
    
    
    handleqr(result);
    
  }
  return (
    <>
      <div className="cam">
        <h4 style={{ color: "#000", position: "fixed", right: 8, top: 2 }}>
          Wallet Address:{" "}
          {account.substring(0, 4) +
            "..." +
            account.substring(account.length - 4, account.length)}
        </h4>
        <br />
        <h2 style={{ position: "absolute", top: 20 }}>
          Scan QR code
        </h2>
        <div style={{ position: "absolute", top: 80,left:680}}>
        
        <input type="file"  onChange={handleChange} accept=".png, .jpg, .jpeg" />
        </div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            top: "50%",
          }}
        >
          <div>
            <h1>{message}</h1>
            
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 90 }}>
          
          <br />
          <span>Please reload the page to Scan again.</span>
        </div>
      </div>
    </>
  );
};

export default Authenticate;
