import Image from "next/image";
import styles from "./Titlebar.module.scss";
import { MdNotificationsNone } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa";
import UserCustomAvatar from "../user/userCustomAvatar";

const Titlebar = () => {
  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <Image
          src="/logo.png"
          alt="SHULEPROV-1.1"
          width={100}
          height={100}
          priority
        />
        ShulePro Primary
      </div>
      <div className={styles.version}>
        <span>ShulePro v2.1 </span>
        Contact: aztecnogiz@gmail
      </div>
      <div className={styles.user}>
        <div className={styles.notice}>
          <MdNotificationsNone />
          <div className={styles.pop_up}>+9</div>
        </div>
        <div className={styles.notice}>
          <FaRegEnvelope />
          <div className={styles.pop_up}>2</div>
        </div>

        <UserCustomAvatar/>
      </div>
    </div>
  );
};

export default Titlebar;
