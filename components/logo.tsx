import Link from "next/link";
import Image from "next/image";
import logoImg from "../public/images/logo.png";

export default function logo(props) {
  const { userType } = props;
  return (
    <>
      {userType.length > 0 ? (
        <>
          {userType == "Candidate" && (
            <div className="w-full max-w-[140px] xl:max-w-[200px]">
              <Link
                href="/marketplace/candidate"
                className="w-full inline-block align-middle"
              >
                <Image src={logoImg} alt="Somhako" />
              </Link>
            </div>
          )}
          {userType == "Organisation" && (
            <div className="w-full max-w-[170px] xl:max-w-[200px]">
              <Link
                href="/marketplace/organisation"
                className="w-full inline-block align-middle"
              >
                <Image src={logoImg} alt="Somhako" />
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="w-full max-w-[170px] xl:max-w-[200px]">
          <Link href="/" className="w-full inline-block align-middle">
            <Image src={logoImg} alt="Somhako" />
          </Link>
        </div>
      )}
    </>
  );
}
