import styled from 'styled-components';
import './success.css'
import React from 'react';
const CardWrapper = styled.div`

.confirmImg{
  margin: auto;
  width: 178px;
}

.confirmPage h1{
  font-family: 'Tajawal', sans-serif !important;
  color: #009045;
}

.confirmPage p{
  font-family: 'Tajawal', sans-serif !important;
}

.confirmPage{
  background: #fcfcfc75 url(http://www.bakheet-group.com/Themes/maker/images/bg-1.png) fixed;
}

@media (max-width: 768px) {
  .sid-img{
    visibility: hidden;
    display:none
   
}
  }

  .input-field{
    flex:100%;
        }
        .left-side{
          margin: 20px 50px;
        }  }
`;
export default function SuccessPage(){
    return  <CardWrapper>
        <div dir='rtl' className='flex items-center justify-center flex-row confirmPage'>
                    <div className="h-[100vh] w-[30vw] sid-img">
              <img
                className="object-cover h-[100vh] w-[30vw]"
                src="../img/driver_register_img.png"
              />
            </div>
        <div className=" m-[auto] mt-[20vh] ">
    <div className='flex items-center' style={{}}>
      <img className="confirmImg" src="../img/confirm.png"></img>
    </div>
    <div className='text-center mt-[20px]'>
    <h1>شكرا لك</h1> 
     {window.status==1? <p className='mt-[20px]'>
تمت تسجيل بيانات مطبخك بنجاح , سيقوم الفريق بمراجعة
طلبك والتواصل معك قريبا</p>: <p className='mt-[20px]'>
تمت تسجيل بياناتك  بنجاح , سيقوم الفريق بمراجعة
طلبك والتواصل معك قريبا</p>}
    </div>
  </div>
    </div>
      </CardWrapper>
    
    
}