import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {
    en: {
      translation: {
        "navHome": "Home",
        "navMenu": "Menu",
        "navOrder": "Order",
        "navProfile": "Profile",
        "navChangepassword": "Change Password",
        "navLogout": "Log out",
        "navLogin": "Log in",
        "Popular Drinks": "Popular Drinks",
        "menuAddtoCart": "Add to cart",
        "menuDescription": "Description",
        "menuRelatedDrink": "Related Drink",
        "Cancel": "Cancel",
        "Create a new account": "Create a new account",
        "Click here": "CLick here",
        "Or sign in with": "Or sign in with",
        "Your Cart": "Your Cart",
        "Drink": "Drink",
        "Name": "Name",
        "Price": "Price",
        "Quantity": "Quantity",
        "Total": "Total",
        "Remove": "Remove",
        "Size": "Size",
        "Topping": "Topping",
        "Cart Totals": "Cart Totals",
        "Subtotal": "Subtotal",
        "btnCheckout": "Check out",
        "Your Order": "Your Order",
        "Delivery": "Delivery Information",
        "Order Totals": "Order Totals",
        "Delivery Fee": "Delivery Fee",
        "Place Order": "Place Order",
        "Save" : "Save",
        "Date":"Date",
        "Order Status":"Order Status",
        "Payment Method":"Payment Method",
        "Payment Status":"Payment Status",
        "Actions":"Actions",
        "Details":"Details",
        "Your Orders": "Your Orders",
        "Forgot Password": "Forgot Password",
        "Reset Password": "Reset Password",
        "Comment": "Comment",
        "Voucher": "Voucher",
        "Review": "Review",
        "Send": "Send",
        "Footer_P": "Come to May Coffee & Tea for the best experience. May Coffee & Tea – a place for peaceful moments.",
        "Cà Phê Sữa Đá": "Iced Milk Coffee",   
        "The Coffee House Sữa Đá": "The Coffee House Iced Milk",
        "Trà Đào Cam Sả Đá": "Peach Orange Lemongrass Iced Tea",
        "Cold Brew Phúc Bồn Tử": "Cold Brew Raspberry",
        "Liên hệ": "Contact",
        "required": "Required",
        "First name": "First name",
        "Last name": "Last name",
        "Phone number": "Phone number",
        "Street number": "Street number",
        "Ward": "Ward",
        "District": "District",
        "Province": "Province",
        "Payment": "Payment",
        "Birth date": "Birth date",
        "Current Password": "Current Password",
        "New Password": "New Password",
        "Confirmed Password": "Confirmed Password",
        "Password": "Password",
        "phonevalid": "Phone number is not valid",
        "passMin": "Password must be at least 8 characters",
        "confirmPass": "Passwords must be match",
        "Invalid email": "Invalid email",


        









      }
    },
    vi: {
      translation: {  
        "navHome": "Trang chủ",
        "navMenu": "Thực đơn",
        "navOrder": "Đơn hàng",
        "navProfile": "Thông tin của bạn",
        "navChangepassword": "Đổi mật khẩu",
        "navLogout": "Đăng xuất",
        "navLogin": "Đăng nhập",
        "Popular Drinks": "Thức uống phổ biến",
        "menuAddtoCart": "Thêm vào giỏ hàng",
        "menuDescription": "Mô tả",
        "menuRelatedDrink": "Thức uống liên quan",
        "Cancel": "Hủy",
        "Create a new account": "Tạo tài khoản mới",
        "Click here": "Đăng ký",
        "Or sign in with": "Hoặc đăng nhập bằng",
        "Register": "Đăng ký",
        "Your Cart": "Giỏ hàng của bạn",
        "Drink": "Thức uống",
        "Name": "Tên",
        "Price": "Giá",
        "Quantity": "Số lượng",
        "Total": "Tổng tiền",
        "Remove": "Xóa sản phẩm",
        "Size": "Kích cỡ",
        "Topping": "Thức ăn đi kèm",
        "Cart Totals": "Tổng tiền trong giỏ hàng",
        "Subtotal": "Tổng cộng",
        "btnCheckout": "Thanh toán",
        "Your Order": "Đơn hàng của bạn",
        "Delivery": "Thông tin giao hàng",
        "Order Totals": "Tổng tiền đơn hàng",
        "Delivery Fee": "Phí giao hàng",
        "Place Order": "Đặt hàng",
        "Save": "Lưu thay đổi",
        "Date": "Ngày thanh toán",
        "Order Status":"Trạng thái đơn hàng",
        "Payment Method":"Phương thức thanh toán",
        "Payment Status":"Trạng thái thanh toán",
        "Details": "Chi tiết",
        "Your Orders": "Đơn hàng của bạn",
        "Forgot Password": "Quên mật khẩu",
        "Reset Password": "Đặt lại mật khẩu",
        "Comment": "Bình luận",
        "Voucher": "Khuyến mãi",
        "Review": "Đánh giá",
        "Send": "Gửi",
        "Footer_P": "Hãy đến với May Coffee & Tea để có những trải nghiệm tuyệt vời nhất. May Coffee & Tea – nơi gửi gắm những khoảng khắc bình yên.",
        "Cà Phê Sữa Đá": "Cà Phê Sữa Đá",
        "The Coffee House Sữa Đá": "The Coffee House Sữa Đá",
        "Trà Đào Cam Sả Đá": "Trà Đào Cam Sả Đá",
        "Cold Brew Phúc Bồn Tử": "Cold Brew Phúc Bồn Tử",
        "Liên hệ": "Liên hệ",
        "required": "Bắt buộc",
        "First name": "Tên",
        "Last name": "Họ",
        "Phone number": "Số điện thoại",
        "Street number": "Số đường",
        "Ward": "Xã",
        "District": "Quận-Huyện",
        "Province": "Tỉnh",
        "Payment": "Phương thức thanh toán",
        "Birth date": "Ngày sinh",
        "Current Password": "Mật khẩu hiện tại",
        "New Password": "Mật khẩu mới",
        "Confirmed Password": "Xác nhận mật khẩu",
        "Password": "Mật khẩu",
        "phonevalid": "Số điện thoại không hợp lệ",
        "passMin": "Mật khẩu phải có ít nhất 8 ký tự",
        "confirmPass": "Mật khẩu phải trùng khớp",
        "Invalid email": "Email không hợp lệ",














        



        
      }
    },
    cn: {
        translation: {  
          "navHome": "主页",
          "navMenu": "菜单",
          "navOrder": "命令",
          "navProfile": "文件",
          "navChangepassword": "更改密码",
          "navLogout": "登出",
          "navLogin": "登录",
          "Popular Drinks": "受欢迎的饮料",
          "menuAddtoCart": "添加到购物车",
          "menuDescription": "描述",
          "menuRelatedDrink": "相关饮品",
          "Cancel": "取消",
          "Create a new account": "建立新帐户",
          "Click here": "点击这里",
          "Or sign in with": "或使用以下方式登录",
          "Register": "登记",
          "Your Cart": "您的购物车",
        "Drink": "喝",
        "Name": "姓名",
        "Price": "价格",
        "Quantity": "数量",
        "Total": "全部的",
        "Remove": "消除",
        "Size": "尺寸",
        "Topping": "配料",
        "Cart Totals": "购物车总金额",
        "Subtotal": "小计",
        "btnCheckout": "支付",
        "Your Order": "你的订单",
        "Delivery": "物流信息",
        "Order Totals": "订单总额",
        "Delivery Fee": "送货费",
        "Place Order": "命令",
        "Save": "保存更改",
        "Date": "付款日期",
        "Order Status":"支付状态",
        "Payment Method":"支付方式",
        "Payment Status":"支付状态",
        "Details": "订单详细信息",
        "Your Orders": "你的订单",
        "Forgot Password": "忘记密码",
        "Reset Password": "重设密码",
        "Comment": "评论",
        "Voucher": "晋升",
        "Review": "评价",
        "Send": "发送",
        "Footer_P": "来到May Coffee & Tea，享受最好的体验。五月咖啡和茶 - 享受宁静时光的地方。",
        "Cà Phê Sữa Đá": "冰牛奶咖啡",
        "The Coffee House Sữa Đá": "苏阿达咖啡馆",
        "Trà Đào Cam Sả Đá": "冰桃橙柠檬草茶",
        "Cold Brew Phúc Bồn Tử": "冷萃覆盆子",
        "Liên hệ": "接触",
        "required": "强制性的",
        "First name": "姓名",
        "Last name": "姓",
        "Phone number": "电话号码",
        "Street number": "街道号",
        "Ward": "病房",
        "District": "区",
        "Province": "省",
        "Payment": "支付",
        "Birth date": "出生日期",
        "Current Password": "当前密码",
        "New Password": "新密码",
        "Confirmed Password": "确认密码",
        "Password": "密码",
        "phonevalid": "电话号码无效",
        "passMin": "密码必须至少包含 8 个字符",
        "confirmPass": "密码必须匹配",
        "Invalid email": "电子邮件无效",
        








        


        }
      }
  };

  i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi",
    fallbackLng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;