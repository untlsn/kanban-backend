import { execAllWait } from '../../helpers/execAll';
import GET from './GET';
import POST from './POST';
import DELETE from './DELETE';

export default execAllWait(GET, POST, DELETE);
