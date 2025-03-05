import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'; 
import useAuthContext from '../../hooks/useAuthContext'
import {
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { adminMenu, mentorMenu, menteeMenu } from '../../components/menus'
import Sidebar from '../../components/sidebar';
import logo from '../../assets/logo-01.jpg'
// import { Icon } from '@rneui/themed'

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
  

  const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role || 'mentee'; 
  };

  const userRole = getUserRole()
  
  const getMenuItems = () =>{
    switch (userRole) {
      case "admin":
        return adminMenu
        case "mentor":
          return mentorMenu
          default:
            return menteeMenu
    }
  }



  console.log('here are te menus ', adminMenu, mentorMenu ,menteeMenu)
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className='w-64' breakpoint="lg" collapsedWidth="0" theme="light" style={{ background: '#fff' }}>
        <div className="flex justify-center items-center" style={{ padding: '16px' }}>
          <img src={logo} alt="Logo" style={{ maxHeight: '60px' }} />
        </div>
        <Menu theme="light" mode="inline" style={{ background: '#fff' , fontSize:'1em'}}>
          {getMenuItems().map((item) => (
            <Menu.Item key={item.path} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}

       
          </Menu>

      </Sider>

      <Layout>
      
        {/* <Header style={{ background: '#fff', padding: 0, textAlign: 'center', fontWeight: 'bold' }}>
          Dashboard
        </Header> */}


        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
