import Link from "next/link";
import styles from "./header.module.scss";
import Image from "next/image";
import HashLink from "../HashLink";

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Link href="/">
              <Image
                src="https://pgvhhgmrjcpcrwvrfuvz.supabase.co/storage/v1/object/public/logo/logo.png"
                alt="Logo"
                width={80}
                height={80}
              />
            </Link>
            <div className={styles.logoText}>
              <h1>ShulePro</h1>
              <span className={styles.version}>v2.1.4</span>
            </div>
          </div>
          <nav className={styles.nav}>
            <HashLink href="/#features" className={styles.navLink}>
              Features
            </HashLink>
            <HashLink href="/#contact" className={styles.navLink}>
              Contact
            </HashLink>
            <HashLink href="/login" className={styles.loginBtn}>
              Login
            </HashLink>
          </nav>
        </div>
      </div>
      <div className={styles.headerPlaceholder}></div>
    </>
  );
};

export default Header;
