import OrderedList from './components/OrderedList';
import UnorderedList from './components/UnorderedList';
import { BLOCKS } from '../../constants';

// eslint-disable-next-line no-unused-vars
export default function toolbar(options) {
  return {
    [BLOCKS.OL_LIST]: OrderedList,
    [BLOCKS.UL_LIST]: UnorderedList,
  };
}
