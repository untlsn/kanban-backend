import GET from './GET';
import POST from './POST';
import PATCH from './PATCH';
import DELETE from './DELETE';
import { execAllWait } from '../../helpers/execAll';

export default execAllWait(GET, POST, PATCH, DELETE);
