import {
  Card,
  Button,
  Table,
  Menu,
  Row,
  Col,
  Icon,
  Input,
  Select,
  Option,
  Form,
  FormItem,
  Checkbox,
  Modal,
  MenuItem,
  MenuGroup,
  Submenu,
  Layout,
  Header,
  Sider,
  Content,
  Breadcrumb,
  Switch,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Message,
  Poptip,
  Alert,
  Spin,
  Drawer,
  Avatar,
  Radio,
  RadioGroup,
  Tooltip,
  Divider,
  Upload,
  Tabs,
  TabPane,
  Page,
  InputNumber,
} from 'view-design'

const viewUI = {
  install(Vue) {
    Vue.component('Form', Form)
    Vue.component('FormItem', FormItem)
    Vue.component('Card', Card)
    Vue.component('Button', Button)
    Vue.component('Table', Table)
    Vue.component('Menu', Menu)
    Vue.component('Submenu', Submenu)
    Vue.component('MenuGroup', MenuGroup)
    Vue.component('MenuItem', MenuItem)
    Vue.component('Row', Row)
    Vue.component('i-col', Col)
    Vue.component('Icon', Icon)
    Vue.component('i-input', Input)
    Vue.component('Select', Select)
    Vue.component('Option', Option)
    Vue.component('Modal', Modal)
    Vue.component('Layout', Layout)
    Vue.component('Header', Header)
    Vue.component('Sider', Sider)
    Vue.component('Content', Content)
    Vue.component('Breadcrumb', Breadcrumb)
    Vue.component('BreadcrumbItem', BreadcrumbItem)
    Vue.component('Dropdown', Dropdown)
    Vue.component('DropdownMenu', DropdownMenu)
    Vue.component('DropdownItem', DropdownItem)
    Vue.component('Poptip', Poptip)
    Vue.component('Alert', Alert)
    Vue.component('Spin', Spin)
    Vue.component('Drawer', Drawer)
    Vue.component('Avatar', Avatar)
    Vue.component('Radio', Radio)
    Vue.component('RadioGroup', RadioGroup)
    Vue.component('i-switch', Switch)
    Vue.component('i-checkbox', Checkbox)
    Vue.component('Tooltip', Tooltip)
    Vue.component('Divider', Divider)
    Vue.component('Upload', Upload)
    Vue.component('Tabs', Tabs)
    Vue.component('TabPane', TabPane)
    Vue.component('Page', Page)
    Vue.component('InputNumber', InputNumber)
    Vue.prototype.$Message = Message
    Vue.prototype.$Modal = Modal
  },
}

export default viewUI
