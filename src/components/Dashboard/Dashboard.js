import Sidebar from "./sidebar";
import Header from "./Header-Admin";

function Dashboard(){
    const containerStyle = {
        backgroundColor: '#363535', // Set the background color here
      };
    return(
        <div style={containerStyle}>
        <Sidebar/>
        <Header/>
        </div>

    );
}

export default Dashboard;