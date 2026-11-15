import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.landing}>
      <div className={styles.frame}>
        <header className={styles.masthead}>
          <p>HANH&apos;S GRAD ERA</p>
          <p>2026</p>
        </header>

        <div className={styles.content}>
          <h1 className={`${styles.title} font-display`}>
            <span>A LITTLE</span>
            <span>CELEBRATION.</span>
          </h1>

          <section className={styles.message} aria-labelledby="landing-message-title">
            <h2 id="landing-message-title">Your invitation has its own special link.</h2>
            <p>Open the personal invitation shared with you.</p>
            <div className={styles.envelope} aria-hidden="true">
              <span className={styles.seal} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
