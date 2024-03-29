import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./StoreDefault.css";
import { useStorageSQLite } from 'react-data-storage-sqlite-hook/dist';


const StoreDefault = () => {
  const [log, setLog] = useState([]);

  const {openStore, getItem, setItem, getAllKeys, getAllValues,
    getAllKeysValues, isKey, setTable, removeItem, clear} = useStorageSQLite();
  useEffect(() => {
    async function testStoreDefault() {
      const keyList1 = ["session","testJson","testNumber"];
      try {
        // open a default store 
        setLog((log) => log.concat("**** Test Default Store ****\n")); 
        await openStore({});
        // clear the store 
        await clear();
        // store a string 
        await setItem("session","Session Opened");
        const session = await getItem('session');
        if( session != null ) {
          setLog((log) => log.concat("session " + session + "\n")); 
        } else {
          throw(Error("session return null"));
        }
        // store a JSON Object in the default store
        const data = {'a':20,'b':'Hello World','c':{'c1':40,'c2':'cool'}};
        await setItem("testJson",JSON.stringify(data));
        const testJson = await getItem("testJson");
        if( testJson != null ) {
          setLog((log) => log.concat("testJson " + testJson + "\n")); 
        } else {
          throw(Error("testJson return null"));
        }
        // store a number in the default store
        const data1 = 243.567;
        await setItem("testNumber",data1.toString());
        // read number from the store
        const testNumber = await getItem("testNumber");
        if( testNumber ) {
          setLog((log) => log.concat("testNumber " + testNumber + "\n")); 
        } else {
          throw(Error("testNumber return null"));
        }
      // isKey test
        const iskey = await isKey('testNumber');
        setLog((log) => log.concat('iskey testNumber ' + iskey + "\n")); 
        const iskey1 = await isKey('foo');
        setLog((log) => log.concat('iskey foo ' + iskey1 + "\n")); 
        // Get All Keys
        const keys = await getAllKeys();
        setLog((log) => log.concat("keys : " + keys.length + "\n"));
        for(let i = 0; i< keys.length;i++) {
          setLog((log) => log.concat(' key[' + i + "] = " + keys[i] + "\n"));
        }
        // Get All Values
        const values = await getAllValues();
        setLog((log) => log.concat("values : " + values.length + "\n"));
        for(let i = 0; i< values.length;i++) {
          setLog((log) => log.concat('value[' + i + "] = " + values[i] + "\n"));
        }
        // Get All KeysValues
        const keysvalues = await getAllKeysValues();
        setLog((log) => log.concat("keysvalues : " + keysvalues.length + "\n"));
        for(let i = 0; i< keysvalues.length;i++) {
          setLog((log) => log.concat(' key[' + i + "] = " + keysvalues[i].key +
            ' value[' + i + "] = " + keysvalues[i].value  + "\n"));
        }

        // Remove a key 
        await removeItem('testJson')
        setLog((log) => log.concat("remove testJson \n")); 
        // Get All Keys
        const keys1 = await getAllKeys();
        setLog((log) => log.concat("keys : " + keys1.length + "\n"));
        for(let i = 0; i< keys1.length;i++) {
          setLog((log) => log.concat(' key[' + i + "] = " + keys1[i] + "\n"));
        }
        if(iskey && !iskey1 && keys1 && keys1.length === 2 && 
          keyList1.includes(keys1[0]) && keyList1.includes(keys1[1])) {
            setLog((log) => log.concat("*** test default store was successfull ***\n"));
            document.querySelector('.success').classList.remove('display');
          } else {
            setLog((log) => log.concat("*** test default store was not successfull ***\n"));
            document.querySelector('.failure').classList.remove('display');
          }
  
      } catch(err) {
        setLog((log) => log.concat(`>>> ${err}\n`));
        setLog((log) => log.concat("*** test default store was not successfull ***\n"));
        document.querySelector('.failure').classList.remove('display');
      }
    }
    testStoreDefault();
  }, [ openStore, getItem, setItem, getAllKeys, getAllValues,
    getAllKeysValues, isKey, setTable, removeItem, clear]); 

  return (
    <React.Fragment>
      <div className="StoreDefault">
        <div id="header">
          <Link to="/">
            <button>
              Home
            </button>
          </Link>
          <p id="title">Test Store Default</p>
        </div>
        <div id="content">
          <pre>
            <p>{log}</p>
          </pre>
          <p className="success display">
            The set of tests was successful
          </p>
          <p className="failure display">
            The set of tests failed
          </p>
        </div>
      </div>
    </React.Fragment>
  );

}
export default StoreDefault;