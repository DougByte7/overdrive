import Image from "next/image"

export default function Home() {
  return (
    <main className="container">
      <Image
        src="/images/FULL-LOGO.svg"
        alt="d10 Logo: Dice Overdrive. Charge your rolls"
        width={731}
        height={301}
        layout="fixed"
      />

      <div className="banner">
        <p className="warning">
          Website Under
          <br />
          Construction
        </p>
      </div>

      <style jsx>{`
        .container {
          background: #121212;
          height: 100vh;
          width: 100%;
          display: grid;
          grid-template-rows: 50% 1fr;
          grid-template-columns: 100%;
          justify-items: center;
          align-items: center;
        }

        .banner {
          align-self: start;
          display: flex;
          align-items: center;
          height: 207px;
          width: 100%;
          background: repeating-linear-gradient(
            -49deg,
            #ff6f00,
            #ff6f00 20px,
            #121212 20px,
            #121212 40px
          );
        }

        .warning {
          color: #121212;
          width: 100%;
          background: #ff6f00;
          padding: 24px;
          text-align: center;
          text-transform: uppercase;
          font-size: 3rem;
          font-family: "Inter", sans-serif;
        }
      `}</style>
    </main>
  )
}
