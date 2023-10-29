import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import User from "../assets/user.svg"
import Image from 'next/image'
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';


const IndexPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.data)
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
     <center><h1>List of Users</h1>
      <h5>View albums for each of the users</h5>
      </center> 
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 1 }} >
        {users.map((user) => (
            <Card
              variant="outlined"
              sx={{ width: "250px", margin: "20px" }}
              key={user.id}
            >
             <center><h3>{user.name}</h3>
              <CardContent>
               <Image src={User} style={{width: "100px" ,height: "100px"}}/>
               <Button variant="contained">
               <Link style={{ textDecoration: 'none',color:'white' }} 
               href={`/albums/${user.id}`} 
               >View Album</Link>
               </Button>
              </CardContent>
              </center>
            </Card>
        ))}
        </Grid>
     
    </div>
  );
};

export default IndexPage;
