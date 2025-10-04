"use client";

import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
  Shield,
  Clock,
} from "lucide-react";
import styles from "./page.module.scss";
import TeamScroller from "@/components/team-scroller-client";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero - Intro*/}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Complete School Management
            <span className={styles.highlight}>
              {" "}
              - Simplified for Educators
            </span>
          </h1>
          <p className={styles.heroDescription}>
            Manage academics, attendance, and parent communications from one
            intuitive dashboard. Built to save administrators and teachers hours
            every week so they can focus on students.
          </p>

          <div className={styles.heroActions}>
            <Link href="/login" className={styles.primaryBtn}>
              Get Started
            </Link>
            <button className={styles.secondaryBtn}>Watch Demo</button>
          </div>
        </div>

        <div className={styles.heroImage}>
          <Image
            src="https://pgvhhgmrjcpcrwvrfuvz.supabase.co/storage/v1/object/public/shulepro-public/classroom.jpg"
            alt="Students using technology"
            className={styles.heroImg}
            width={700}
            height={500}
            priority
          />
        </div>
      </section>

      {/* Full-width intro/CTA hero (gradient background) */}
      <section className={styles.heroFull}>
        <h1 className={styles.title}>
          Streamline School Operations
          <span className={styles.highlight}> Effortlessly</span>
        </h1>

        <p className={styles.subtitle}>
          Centralize admissions, billing, and reporting — reduce manual work and
          improve visibility across the whole institution with secure,
          role-based access.
        </p>

        <div className={styles.quickFeatures}>
          <div className={styles.qFeature}>
            <div className={styles.qFeatureIcon}>👥</div>
            <h3>Student Profiles</h3>
            <p>
              Complete records with contact logs and parent communication tools.
            </p>
          </div>

          <div className={styles.qFeature}>
            <div className={styles.qFeatureIcon}>📚</div>
            <h3>Curriculum Tools</h3>
            <p>
              Create timetables, attach resources, and publish assessments fast.
            </p>
          </div>

          <div className={styles.qFeature}>
            <div className={styles.qFeatureIcon}>💰</div>
            <h3>Invoicing & Receipts</h3>
            <p>
              Automate fee collection, generate receipts and export statements.
            </p>
          </div>

          <div className={styles.qFeature}>
            <div className={styles.qFeatureIcon}>📊</div>
            <h3>Dashboards</h3>
            <p>
              Instant insights — performance, attendance, and financial
              snapshots.
            </p>
          </div>
        </div>

        <div className={styles.cta}>
          <Link href="/demo" className={styles.demoButton}>
            Request Live Demo
          </Link>
        </div>
      </section>

      {/* Features / Why Choose */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2>Why Choose ShulePro?</h2>
          <p>
            Powerful features built specifically for modern educational
            institutions.
          </p>
        </div>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <Users className={styles.featureIcon} />
            <h3>Student Management</h3>
            <p>
              Complete student profiles, enrollment flows and progress tracking.
            </p>
          </div>

          <div className={styles.featureCard}>
            <BookOpen className={styles.featureIcon} />
            <h3>Course Management</h3>
            <p>Organize curricula, manage resources and publish schedules.</p>
          </div>

          <div className={styles.featureCard}>
            <BarChart3 className={styles.featureIcon} />
            <h3>Analytics & Reports</h3>
            <p>
              Customizable reports to measure outcomes and spot trends quickly.
            </p>
          </div>

          <div className={styles.featureCard}>
            <Shield className={styles.featureIcon} />
            <h3>Secure & Reliable</h3>
            <p>
              Role-based access and industry-standard protections for your data.
            </p>
          </div>

          <div className={styles.featureCard}>
            <Clock className={styles.featureIcon} />
            <h3>Time Management</h3>
            <p>Automated scheduling, attendance and deadline tooling.</p>
          </div>

          <div className={styles.featureCard}>
            <GraduationCap className={styles.featureIcon} />
            <h3>Grade Management</h3>
            <p>
              Streamlined grading, automated calculations and parent alerts.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to Transform Your School?</h2>
          <p>
            Join other institutions improving outcomes and saving administrative
            time.
          </p>
          <Link href="/login" className={styles.ctaBtn}>
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Team scroller*/}
      <TeamScroller targetId="features" />
    </div>
  );
}
