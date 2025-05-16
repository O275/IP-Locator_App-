import React, { useState } from 'react';
import {Input, Button} from '@mui/material'
import './IpSearch.css';

const IpSearch = ({ onSearch }) => {
  const [ipAddress, setIpAddress] = useState('');

  const handleIpSearch = async () => {

    if (ipAddress) {
      onSearch(ipAddress);
    }
  };

  return (

 <div style={{display: 'flex', flexDirection: 'row', gap: '3px', justifyContent: 'center'}}>
        <Input
          type="search"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          placeholder="Enter IP address"

        />
        <Button variant={'outlined'} type="submit" onClick={() => handleIpSearch() }>Search</Button>
        </div>
  );
}

export default IpSearch;