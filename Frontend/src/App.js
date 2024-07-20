// src/App.js
import React , { useEffect }from 'react';
import DataTable from './components/DataTable';
import dataset from './services/dataset';
import { extractColumnNames } from './helpers/extractColumnNames';
import { addIndex } from './helpers/addIndex';
import CustomNavbar from './components/navbar'
import { useDispatch } from 'react-redux';
import { setProducts } from './state/actions';

import "./services/socketClient"
// import Footer from './components/footer';
const indexedDataset = addIndex(dataset);
const columns = extractColumnNames(indexedDataset);

function App() {
    const dispatch = useDispatch();


useEffect(() => {
    // Load your dataset (e.g., from an API or a static file)
    const fetchData =() => {
      const data = dataset
      dispatch(setProducts(data));
    };
  
    fetchData();
  }, [dispatch]);
    return (
        <div className="App">
          <CustomNavbar/>
            <DataTable  striped
    bordered
    hover
    responsive
    className="custom-table" columns={columns} products={indexedDataset} />
            {/* <Footer /> */}

            
        </div>
    );
}

export default App;
