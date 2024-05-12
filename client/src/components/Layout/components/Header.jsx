import { Col, Dropdown, Menu, Row, Tooltip } from "antd"
import { HeaderStyled } from "../styled"
import viteLogo from '/vite.svg'
import { commonRouter } from "src/lib/constant"
import { MenuAdmin, MenuCommon, MenuUser } from "../MenuItems"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import Router from "src/routers"
import globalSlice from "src/redux/globalSlice"
import ListIcons from "src/components/ListIcons"
import InputCustom from "src/components/InputCustom"

const Header = () => {

  const global = useSelector(globalSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('currentSong')
    localStorage.removeItem('currentTime')
    localStorage.removeItem('currentSlider')
    dispatch(globalSlice.actions.setUser({}))
    // socket.disconnect()
    navigate('/login')
  }

  const menuAccoutUser = [
    {
      key: Router.DASHBOARD,
      label: (
        <div>Dashboard</div>
      )
    },
    {
      key: Router.CAI_DAT_TAI_KHOAN,
      label: (
        <div>Cài đặt tài khoản</div>
      )
    },
    {
      label: (
        <div>Đăng xuất</div>
      ),
      onClick: () => handleLogout()
    },
  ]

  return (
    <HeaderStyled>
      <Row>
        <Col span={16} className="d-flex-sb">
          <img
            className="cursor-pointer"
            onClick={() => navigate("/")}
            src={viteLogo}
            alt=""
            style={{ width: '50px', height: "50px" }}
          />
          <div style={{ flex: 1 }}>
            {
              commonRouter.includes(location.pathname) ?
                <Menu
                  mode="horizontal"
                  items={MenuCommon}
                  selectedKeys={location?.pathname}
                  onClick={(e) => navigate(e?.key)}
                />
                :
                global?.user?.RoleID === 3 ?
                  <Menu
                    mode="horizontal"
                    selectedKeys={location?.pathname}
                    items={MenuUser}
                    onClick={(e) => navigate(e?.key)}
                  />
                  :
                  <Menu
                    mode="horizontal"
                    selectedKeys={location?.pathname}
                    items={MenuAdmin}
                    onClick={(e) => navigate(e?.key)}
                  />
            }
          </div>
        </Col>
        <Col span={8} className="d-flex-end">
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            arrow
            overlay={
              <>
                <InputCustom
                  placeholder="Bạn muốn học gì?"
                  style={{ width: "500px" }}
                />
              </>
            }
          >
            {ListIcons.ICON_SEARCH}
          </Dropdown>
          <div className="ml-12">
            {
              global?.user?._id ?
                <Tooltip arrow={false} title={global?.user?.FullName} trigger="hover">
                  <Dropdown menu={{ items: menuAccoutUser }} trigger={['click']}>
                    <img src={global?.user?.AvatarPath} alt="" />
                  </Dropdown>
                </Tooltip>
                :
                <div
                  className="d-flex-end cursor-pointer"
                  onClick={() => navigate("/dang-nhap")}
                >
                  <img
                    src="https://takelessons.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon-avatar.95340bc0.png&w=1920&q=75"
                    alt=""
                    style={{
                      width: '32px',
                      height: "32px"
                    }}
                  />
                  <span className="ml-12">Đăng nhập</span>
                </div>
            }
          </div>
        </Col>
      </Row>
    </HeaderStyled>
  )
}

export default Header