"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut, ChevronDown, Import } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./userCustomAvatar.module.scss";
import useLogout from "@/lib/Logout";

interface UserAvatarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onSignOut?: () => void;
}

const UserCustomAvatar = ({ user, onSignOut }: UserAvatarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout, loading } = useLogout();

  // Default user data for demo purposes
  const defaultUser = {
    name: "Wadeya Wicklife",
    email: "email@example.com",
    avatar: "/avator.png",
  };

  const currentUser = user || defaultUser;

  const menuItems = [
    {
      icon: <User size={18} />,
      label: "My Profile",
      href: "/profile",
      action: null,
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      href: "/settings",
      action: null,
    },
    {
      icon: <LogOut size={18} />,
      label: "Sign Out",
      href: null,
      action: onSignOut || (() => console.log("Sign out clicked")),
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className={styles.userAvatar} ref={dropdownRef}>
      <button
        className={styles.avatarButton}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User menu"
      >
        <div className={styles.avatarContainer}>
          {currentUser.avatar ? (
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              width={40}
              height={40}
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <User size={20} />
            </div>
          )}
          <div className={styles.onlineIndicator} />
        </div>

        <div className={styles.userInfo}>
          <span className={styles.userName}>{currentUser.name}</span>
          <ChevronDown
            size={16}
            className={`${styles.chevron} ${isOpen ? styles.rotated : ""}`}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.dropdownHeader}>
              <div className={styles.headerAvatar}>
                {currentUser.avatar ? (
                  <Image
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    width={50}
                    height={50}
                    className={styles.headerAvatarImage}
                  />
                ) : (
                  <div className={styles.headerAvatarPlaceholder}>
                    <User size={24} />
                  </div>
                )}
              </div>
              <div className={styles.headerInfo}>
                <h4>{currentUser.name}</h4>
                <p>{currentUser.email}</p>
              </div>
            </div>

            <div className={styles.dropdownDivider} />

            <div className={styles.dropdownMenu}>
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={styles.menuItem}
                      onClick={closeDropdown}
                    >
                      <span className={styles.menuIcon}>{item.icon}</span>
                      <span className={styles.menuLabel}>{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      className={`${styles.menuItem} ${styles.signOut}`}
                      onClick={logout}
                      disabled={loading}
                    >
                      <span className={styles.menuIcon}>{item.icon}</span>
                      <span className={styles.menuLabel}>
                        {loading ? "Signing out…" : "Sign out"}
                      </span>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserCustomAvatar;
