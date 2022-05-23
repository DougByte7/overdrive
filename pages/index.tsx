import Image from "next/image"

export default function Home() {
  return (
    <main className="container">
      <div className="logo-text">
        <Image
          src="/images/LOGO-TEXT.svg"
          alt="Dice Overdrive. Charge your rolls"
          width={414}
          height={129}
        />

        <Image
          aria-hidden={true}
          alt="Dice Overdrive logo"
          src="/d10-electric.svg"
          width={194}
          height={222}
        />
      </div>

      <div className="logo">
        <Image
          src="/images/FULL-LOGO.svg"
          alt="d10 Logo: Dice Overdrive. Charge your rolls"
          width={731}
          height={301}
          layout="fixed"
        />
      </div>

      <div className="banner">
        <p className="warning">
          Website&nbsp;Under
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
          grid-template-rows: 60% 1fr;
          grid-template-columns: 100%;
          justify-items: center;
          align-items: center;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .logo {
          display: none;
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
          padding: 24px 0;
          text-align: center;
          text-transform: uppercase;
          font-size: 2.5rem;
          font-family: Inter, sans-serif;
          margin: 0;
        }

        @media screen and (min-width: 750px) {
          .container {
            grid-template-rows: 50% 1fr;
          }

          .logo-text {
            display: none;
          }

          .logo {
            display: initial;
          }

          .warning {
            font-size: 3rem;
          }
        }
      `}</style>
    </main>
  )
}
