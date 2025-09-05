import { library } from "@fortawesome/fontawesome-svg-core";
import { 
  faLink, 
  faPowerOff, 
  faUser,
  faSignInAlt,
  faSignOutAlt,
  faCopy,
  faCogs,
  faEye,
  faGlobe,
  faTools,
  faShieldAlt,
  faSun,
  faMoon,
  faCloud,
  faKey,
  faIdCard,
  faRedo,
  faSyncAlt,
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTerminal,
  faPlay,
  faCode,
  faUnlockAlt
} from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
  library.add(faSignInAlt);
  library.add(faSignOutAlt);
  library.add(faCopy);
  library.add(faCogs);
  library.add(faEye);
  library.add(faGlobe);
  library.add(faTools);
  library.add(faShieldAlt);
  library.add(faSun);
  library.add(faMoon);
  library.add(faCloud);
  library.add(faKey);
  library.add(faIdCard);
  library.add(faRedo);
  library.add(faSyncAlt);
  library.add(faCheckCircle);
  library.add(faExclamationCircle);
  library.add(faExclamationTriangle);
  library.add(faInfoCircle);
  library.add(faTerminal);
  library.add(faPlay);
  library.add(faCode);
  library.add(faUnlockAlt);
}

export default initFontAwesome;
