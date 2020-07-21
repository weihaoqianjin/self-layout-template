
import DataList from './data-list'
import Panel from './panel'
import HbSelect from './hb-select'
import HbInput from './hb-input'
import HbBlock from './hb-block'
import HbSwitch from './hb-switch'
import HbDatePicker from './hb-date-picker'
import HbButton from './hb-button'
import HbCheckGroup from './hb-check-group'
import HbVcode from './hb-vcode'
import CkSelect from './ck-select'
import HbPagination from './hb-pagination'
import HbInputNumber from './hb-input-number'
import HbImage from './hb-image'
import HbScroll from './hb-scroll'
import HbTable from './hb-table'
import HbTableColumn from './hb-table-column'
import HbTitleBar from './hb-title-bar'
import HbCascader from './hb-cascader'
import HbTree from './hb-tree'
import HbUpload from './hb-upload'
import HbCol from './hb-col'
import HbMenu from './hb-menu'

const components = [
  DataList,
  Panel,
  HbSelect,
  HbInput,
  HbBlock,
  HbSwitch,
  HbDatePicker,
  HbButton,
  HbCheckGroup,
  HbVcode,
  CkSelect,
  HbPagination,
  HbInputNumber,
  HbImage,
  HbScroll,
  HbTable,
  HbTableColumn,
  HbTitleBar,
  HbCascader,
  HbTree,
  HbUpload,
  HbCol,
  HbMenu
]

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default install
