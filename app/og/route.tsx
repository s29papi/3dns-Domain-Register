import { ImageResponse } from 'next/og';
import { CiSearch } from "react-icons/ci";
import { IoHeartOutline,  IoCheckmarkSharp} from "react-icons/io5";
import { TbAdjustments } from "react-icons/tb";
import { NextRequest } from 'next/server';
 
export const runtime = 'edge';
 
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const domainName:any = searchParams.get("domainName");
  const renewalFee:any = searchParams.get("renewalFee");
  const firstYearRegistrationFee:any = searchParams.get("firstYearRegistrationFee");
  const status:any = searchParams.get("status");
    const interFontData = await fetch(
        new URL('../../public/Inter-Regular.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());
    const interBoldFontData = await fetch(
        new URL('../../public/Inter-Bold.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());
   
    
    let parts = domainName.split(".");
    let domain = parts[0];
    let extension = parts[1];
    let domainPriceUsdc = addDecimalBeforeLastTwoZeros(firstYearRegistrationFee);
    let renewalDomainPriceUsdc = addDecimalBeforeLastTwoZeros(renewalFee);
    let statusAvailable = false;
    if (status === 'STATUS_AVAILABLE') {
      statusAvailable = true;
    }
    let availColor = statusAvailable ? "text-lime-400" : "text-red-500";
    let availWeight = statusAvailable ? "w-22" : "w-26";

  return new ImageResponse(
    (
      <div tw="flex w-[800px] h-[420px]" >
        <div tw="flex relative">
             <img tw="w-full h-full" src="https://3dns-domain-register-frame.vercel.app/base.png" />
             <div tw="flex flex-col w-full h-full absolute">
                <div tw="flex h-full w-full">
                    <div tw="flex flex-col md:flex-row w-full py-12 px-4 justify-between p-8">
                        <div tw="flex flex-col text-xl sm:text-3xl mt-6 mr-6 ml-6 mb-6 font-bold tracking-tight text-white text-left">
                          <span tw="top-12" style={{fontFamily: 'Inter-Bold'}}>Search</span>  
                          <span tw="flex relative">
                              <div tw="left-0 w-168 h-12 top-16 bg-zinc-800 rounded border border-white"  />
                              <span tw="absolute flex flex-col top-11 text-lg sm:text-xl md:flex-row w-full py-12 px-4 justify-between p-8">
                                      <span tw='right-2'>{statusAvailable ? domainName : "Not Available"}</span>
                                      <span tw="top-1">
                                          <span tw="right-3.8 bottom-1.8 text-2xl">x</span>
                                          <span tw="right-2"><TbAdjustments size={"1.1em"}/></span>
                                          <span tw="w-5 h-5 bg-lime-500 rounded justify-center">
                                            <span><CiSearch color='black' /> </span>
                                          </span>
                                      </span>
                              </span>
                          </span>  
                          <span tw="flex">
                              <span tw="flex flex-col right-4.3 md:flex-row top-20 w-full py-12 px-4 justify-between p-8">
                                      <span tw="right-4">
                                          <span style={{fontFamily: "Inter-Bold"}}>{domain}</span>
                                          <span style={{fontFamily: "Inter"}}>{"." + extension}</span>
                                        </span>
                                      <span >
                                        <span>
                                        <span tw='top-1.28'>
                                            <svg width="26" height="27" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M16 32.5C24.8366 32.5 32 25.3366 32 16.5C32 7.66344 24.8366 0.5 16 0.5C7.16344 0.5 0 7.66344 0 16.5C0 25.3366 7.16344 32.5 16 32.5Z" fill="#3E73C4"/>
                                                      <path d="M20.022 18.624C20.022 16.5 18.742 15.772 16.182 15.468C14.354 15.225 13.989 14.74 13.989 13.89C13.989 13.04 14.599 12.494 15.817 12.494C16.914 12.494 17.524 12.858 17.828 13.769C17.8597 13.8571 17.9176 13.9334 17.9939 13.9875C18.0703 14.0417 18.1614 14.0712 18.255 14.072H19.23C19.2863 14.0735 19.3423 14.0636 19.3947 14.0428C19.4471 14.022 19.4946 13.9907 19.5346 13.951C19.5745 13.9113 19.6059 13.8638 19.627 13.8116C19.648 13.7593 19.6582 13.7033 19.657 13.647V13.587C19.5378 12.9279 19.2043 12.3266 18.7083 11.8765C18.2123 11.4264 17.5815 11.1528 16.914 11.098V9.64201C16.914 9.39901 16.731 9.21701 16.427 9.15601H15.512C15.269 9.15601 15.086 9.33801 15.025 9.64201V11.038C13.196 11.28 12.039 12.494 12.039 14.012C12.039 16.014 13.257 16.803 15.817 17.107C17.524 17.41 18.072 17.775 18.072 18.746C18.072 19.716 17.219 20.384 16.061 20.384C14.476 20.384 13.928 19.717 13.745 18.806C13.685 18.564 13.501 18.442 13.318 18.442H12.282C12.2258 18.4406 12.1698 18.4507 12.1176 18.4716C12.0654 18.4924 12.0179 18.5237 11.9781 18.5634C11.9383 18.6031 11.9069 18.6505 11.8859 18.7027C11.8649 18.7549 11.8548 18.8108 11.856 18.867V18.927C12.099 20.445 13.075 21.537 15.086 21.841V23.298C15.086 23.54 15.269 23.723 15.573 23.783H16.488C16.731 23.783 16.914 23.601 16.975 23.298V21.84C18.804 21.537 20.022 20.262 20.022 18.623V18.624Z" fill="white"/>
                                                      <path d="M12.892 24.997C8.13798 23.297 5.69998 18.017 7.46798 13.344C8.38198 10.794 10.393 8.853 12.892 7.942C13.136 7.821 13.257 7.639 13.257 7.335V6.485C13.257 6.243 13.136 6.061 12.892 6C12.831 6 12.709 6 12.648 6.06C11.2764 6.48832 10.0031 7.18373 8.9014 8.10617C7.79969 9.02862 6.89133 10.1599 6.22863 11.4348C5.56592 12.7098 5.16195 14.1032 5.03999 15.5349C4.91803 16.9666 5.08048 18.4083 5.51798 19.777C6.61398 23.177 9.23498 25.787 12.648 26.879C12.892 27 13.136 26.879 13.196 26.636C13.257 26.576 13.257 26.514 13.257 26.393V25.543C13.257 25.361 13.075 25.119 12.892 24.997ZM19.352 6.061C19.108 5.939 18.864 6.061 18.804 6.303C18.743 6.364 18.743 6.425 18.743 6.546V7.396C18.743 7.639 18.925 7.881 19.108 8.003C23.862 9.703 26.3 14.983 24.532 19.656C23.618 22.206 21.607 24.147 19.108 25.058C18.864 25.179 18.743 25.361 18.743 25.665V26.515C18.743 26.757 18.864 26.939 19.108 27C19.169 27 19.291 27 19.352 26.94C20.7236 26.5117 21.9968 25.8163 23.0986 24.8938C24.2003 23.9714 25.1086 22.8401 25.7713 21.5652C26.434 20.2902 26.838 18.8968 26.96 17.4651C27.0819 16.0334 26.9195 14.5917 26.482 13.223C25.386 9.763 22.704 7.153 19.352 6.061Z" fill="white"/>
                                            </svg>
                                        </span>
                                            <span tw="left-1" style={{fontFamily: "Inter-Bold"}}>{domainPriceUsdc}</span>
                                        </span>
                                      </span>
                              </span>
                          </span>  
                          <span tw="flex">
                                <span tw="flex flex-col md:flex-row right-4.3 w-full top-4 py-12 px-4 justify-between p-8">
                                        <span tw="right-4 mt-2">
                                            <span tw={`flex pl-2.5 ${availWeight} h-7 pr-4 py-1.5 bg-stone-600 rounded flex-col justify-start items-start gap-1.5 inline-flex`}>                         
                                            <span tw={`flex ${availColor} text-xs font-semibold`} style={{fontFamily: "Inter"}}>
                                                 <span tw="flex mt-0.5 mr-1.5">
                                                     { statusAvailable ? <IoCheckmarkSharp size={"1.2em"}/> :  "" }  
                                                   </span>
                                                   <span tw="top-0.18" style={{fontFamily: "Inter-Bold"}}>{statusAvailable ? "Available" : "Not Available"}</span>
                                               </span>
                                             </span>
                                            <span tw="flex bottom-1.8">
                                                <span tw="flex left-4 top-0.8">{statusAvailable ? <IoHeartOutline size={"1.2em"}/> : ""}</span>
                                            </span>
                                            <span tw="left-5.0 mt-1 text-sm">{ statusAvailable ? "Add to Wishlist" : "" }</span>
                                        </span>
                                    <span>
                                      <span tw="top-2.8 left-1 text-sm"> 
                                            <span tw="right-3">Renews at </span>
                                            <span tw="right-1.8">
                                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <g clip-path="url(#clip0_45_195)">
                                                      <path d="M9.5 19C14.7467 19 19 14.7467 19 9.5C19 4.25329 14.7467 0 9.5 0C4.25329 0 0 4.25329 0 9.5C0 14.7467 4.25329 19 9.5 19Z" fill="#3D3E40"/>
                                                      <path d="M11.8881 10.7612C11.8881 9.50003 11.1281 9.06778 9.60805 8.88728C8.52268 8.743 8.30596 8.45503 8.30596 7.95034C8.30596 7.44565 8.66814 7.12146 9.39133 7.12146C10.0427 7.12146 10.4049 7.33759 10.5854 7.8785C10.6042 7.9308 10.6386 7.97608 10.6839 8.00825C10.7292 8.04041 10.7833 8.05792 10.8389 8.0584H11.4178C11.4512 8.05929 11.4845 8.05339 11.5156 8.04104C11.5467 8.02869 11.5749 8.01015 11.5986 7.98655C11.6223 7.96296 11.641 7.93479 11.6535 7.90377C11.666 7.87274 11.6721 7.8395 11.6713 7.80606V7.77043C11.6006 7.37909 11.4026 7.02207 11.1081 6.75483C10.8136 6.48759 10.439 6.3251 10.0427 6.29259V5.42809C10.0427 5.28381 9.93402 5.17575 9.75352 5.13953H9.21024C9.06596 5.13953 8.9573 5.24759 8.92108 5.42809V6.25696C7.83511 6.40065 7.14814 7.12146 7.14814 8.02278C7.14814 9.21146 7.87133 9.67993 9.39133 9.86043C10.4049 10.0403 10.7302 10.2571 10.7302 10.8336C10.7302 11.4095 10.2238 11.8062 9.53621 11.8062C8.59511 11.8062 8.26974 11.4101 8.16108 10.8692C8.12546 10.7255 8.01621 10.6531 7.90755 10.6531H7.29243C7.25904 10.6523 7.22583 10.6582 7.19482 10.6706C7.1638 10.683 7.13562 10.7016 7.11198 10.7252C7.08834 10.7487 7.06972 10.7769 7.05726 10.8079C7.0448 10.8389 7.03876 10.872 7.03949 10.9054V10.9411C7.18377 11.8424 7.76327 12.4907 8.9573 12.6712V13.5363C8.9573 13.68 9.06596 13.7887 9.24646 13.8243H9.78974C9.93402 13.8243 10.0427 13.7162 10.0789 13.5363V12.6707C11.1649 12.4907 11.8881 11.7337 11.8881 10.7606V10.7612Z" fill="white"/>
                                                      <path d="M7.65464 14.5451C4.83196 13.5357 3.38439 10.4007 4.43414 7.62612C4.97683 6.11206 6.17086 4.95959 7.65464 4.41869C7.79952 4.34684 7.87136 4.23878 7.87136 4.05828V3.55359C7.87136 3.40991 7.79952 3.30184 7.65464 3.26562C7.61842 3.26562 7.54599 3.26562 7.50977 3.30125C6.6954 3.55557 5.93938 3.96846 5.28524 4.51617C4.6311 5.06387 4.09176 5.73555 3.69828 6.49255C3.30479 7.24955 3.06494 8.07691 2.99252 8.92699C2.92011 9.77706 3.01656 10.6331 3.27633 11.4457C3.92708 13.4645 5.4833 15.0142 7.50977 15.6625C7.65464 15.7344 7.79952 15.6625 7.83514 15.5182C7.87136 15.4826 7.87136 15.4458 7.87136 15.374V14.8693C7.87136 14.7612 7.7633 14.6175 7.65464 14.5451ZM11.4903 3.30184C11.3454 3.22941 11.2005 3.30184 11.1649 3.44553C11.1287 3.48175 11.1287 3.51797 11.1287 3.58981V4.0945C11.1287 4.23878 11.2367 4.38247 11.3454 4.45491C14.1681 5.46428 15.6156 8.59928 14.5659 11.3739C14.0232 12.8879 12.8292 14.0404 11.3454 14.5813C11.2005 14.6532 11.1287 14.7612 11.1287 14.9417V15.4464C11.1287 15.5901 11.2005 15.6982 11.3454 15.7344C11.3816 15.7344 11.454 15.7344 11.4903 15.6988C12.3046 15.4444 13.0607 15.0315 13.7148 14.4838C14.3689 13.9361 14.9083 13.2644 15.3018 12.5074C15.6952 11.7504 15.9351 10.9231 16.0075 10.073C16.0799 9.22294 15.9835 8.36693 15.7237 7.55428C15.073 5.49991 13.4805 3.95022 11.4903 3.30184Z" fill="white"/>
                                                      </g>
                                                      <defs>
                                                      <clipPath id="clip0_45_195">
                                                      <rect width="19" height="19" fill="white"/>
                                                      </clipPath>
                                                      </defs>
                                                </svg>
                                            </span>
                                            <span tw="right-1">{renewalDomainPriceUsdc}</span>
                                      </span>
                                     
                                    </span>
                              </span>
                          </span>  
                        </div>
                    </div>
                </div>
             </div>
        </div>
        
      </div>
        
    ),
    {
      width: 800,
      height: 420,
      fonts: [
        {
          name: 'Inter',
          data: interFontData,
          style: 'normal',
        },
        {
          name: 'Inter-Bold',
          data: interBoldFontData,
          style: "normal",
        },
    ]
    },
  );
}

function addDecimalBeforeLastTwoZeros(str: string) {
  let num = parseFloat(str);
  num /= 100;
  let result = num.toFixed(2);

  return result;
}










