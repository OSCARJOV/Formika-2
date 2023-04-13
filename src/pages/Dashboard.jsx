import { async } from "@firebase/util";
import { logout } from "../config/firebase";

const Dashboard = () => {
    
    const handlelogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
        <h1>Dashboard</h1>
        <button onClick={handlelogout}>Logout</button>
        
        </>
    );
};

export default Dashboard;
