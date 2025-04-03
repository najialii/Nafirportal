import { Layout, Menu, Avatar, Button } from 'antd';
import { Link , Outlet} from 'react-router-dom'; 
import axios from 'axios'
import useAuthContext from '../../hooks/useAuthContext'
import {
  HomeOutlined,
  TeamOutlined,
  SettingOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { adminMenu, mentorMenu, menteeMenu, superAdminMenu } from '../../components/menus'
import { GlobalOutlined } from '@ant-design/icons';
import Sidebar from '../../components/sidebar';
import logo from '../../assets/naflogo-01.svg'
import { useLocation } from 'react-router-dom'; 
import { ErrorBar } from 'recharts';


const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  
  const location = useLocation();

  const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role || 'mentee'; 
  };

  
  const logout = async() => {
    console.log('logging out')
    try{
const response = await axios.post('http://localhost:4000/api/user/logout')
console.log(response.data)
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
      window.location.href = '/login';
    }catch(error) {
      console.error(error)
      console.error(ErrorBar.message)
    }
  }
  const userRole = getUserRole()
  
  const getMenuItems = () =>{
    switch (userRole) {
      case "admin":
        return adminMenu
        case "mentor":
          return mentorMenu
          case  "superadmin": 
          return superAdminMenu
          default:
            return menteeMenu
    }
  }



  
  return (
    <Layout style={{ marginLeft: 250, minHeight: '100vh', overflow: 'hidden' }}>

     <Sider
        breakpoint="lg"
        collapsedWidth="0"
        theme="light"
        width={250}
        style={{
       
          position: 'fixed', 
          height: '100vh', 
          left: 0,
          top: 0,
          bottom: 0,
          background: '#fff',
          borderRight: '0.2px solid rgba(0, 0, 0, 0.1)',
          transition: 'width 0.3s',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div className='absloute  mb-2 top--2 left-2 w-full bg-white z-10'>

        <div className="flex justify-center items-center p-0" style={{ padding: 'px' }}>
          <img
            src={logo}
            alt="Logo"
            className='rounded-md'
            style={{
              maxHeight: '80px',
              transition: 'transform 0.3s',
              cursor: 'pointer',
            }}
          />
        </div>
        </div>

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{
            background: 'transparent',
            height: 'calc(100% - 100px)', 
            // fontSize: '1rem',
            border: 'none',
            padding: '10px 0',
          }}
        >
          {getMenuItems().map((item) => (
            <Menu.Item
              key={item.path}
              icon={item.icon }
              style={{
                padding: '12px 20px',
                fontWeight: '500',
                transition: 'all 0.3s ease-in-out',
                borderRadius: '8px',
                margin: '10px 10px 16px',
                color: location.pathname === item.path ? '#fff' : '#333', 
                background: location.pathname === item.path ? '#221F42' : 'transparent', 
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#221F42'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Link
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: '#333',
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  padding: '8px 0',
                  color: location.pathname === item.path ? '#fff' : '#333', 
                }}
              >
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>

        <div
        className='sticky bottom-0 border-t  justify-center'
          style={{
     
            bottom: '80px',
            left: '0',
            right: '0',
            padding: '10px',
          }}
        >
         <Menu
  theme="light"
  mode="inline"
  style={{
    background: 'transparent',
    border: 'none',
    padding: '0',
    fontSize: '1rem',
  }}
>
  
  {/* <div
    style={{
      borderTop: '1px solid rgba(0, 0, 0, 0.1)',
      margin: '10px 0',
    }}
  /> */}
{/* 
  <Menu.Item
    key="settings"
    icon={<SettingOutlined />}
    style={{
      fontWeight: '500',
      transition: 'background 0.3s ease-in-out',
      borderRadius: '8px',
      margin: '5px 10px',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = '#f0f8ff')}
    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
  >
    <Link
      to="/settings"
      style={{
        textDecoration: 'none',
        color: '#333',
        display: 'block',
        width: '100%',
        height: '100%',
        padding: '10px 0',
      }}
    >
      Settings
    </Link>
  </Menu.Item> */}

 
  <div className="">
    <Button
      key="logout"
      icon={<PoweroffOutlined />}
      style={{
        padding: '12px 24px',
        fontWeight: '500',
        transition: 'background 0.3s ease-in-out, transform 0.2s ease',
        borderRadius: '10px',
        border: '2px solid red',
        color: 'red',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={logout}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#ffcccc';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      Logout
    </Button>
  </div>
</Menu>

        </div>
      </Sider>
      <Layout>
    <div className='w-full justify-center  pb-4'>
      <header className="py-4 w-full bg-white flex justify-between items-center px-8 ">
  
  {/* <Button style={{ padding: "8px 16px", fontWeight: "500", borderRadius: "4px" }}>Back</Button> */}
  <span className='text-base p-2 border rounded-xl border-primary-light hover:text-white hover:bg-primary-light cursor-pointer text-gray-700 flex  items-center'>

  <GlobalOutlined style={{ marginRight: '8px' }} />
  <h2>
    EN
  </h2>
  </span>

  <div className="flex items-center gap-4">
    <Avatar 
      size={32} 
      src="https://www.example.com/default-avatar.png" 
      style={{
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
      onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
    />
    {/* <span style={{ fontWeight: "500", color: "#333" }}>username</span> */}
  </div>
</header>

      </div>  
     <Content style={{ padding: "0px", minHeight: "360px", background: "#f0f0f0" }}>

   
          <div className='h-full  rounded-md' style={{ padding: 16, minHeight: 360 }}>      <Outlet />
          </div>
        </Content>
      </Layout>

    </Layout>
    
  );
};

export default DashboardLayout;
