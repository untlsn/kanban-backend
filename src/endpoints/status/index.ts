import { execAllWait } from '../../helpers/execAll';
import GET from '../board/GET';
import POST from '../board/POST';
import PATCH from '../board/PATCH';
import DELETE from '../board/DELETE';

export default execAllWait(GET, POST, PATCH, DELETE);
