import React from 'react'
import MentorCard from '../components/MentorCard'
import {Input} from 'antd'
function Mentrships() {
  return (
    <div className='bg-gray-100'>
<div className='bg-white mx-12 p-4'>
<div>
    <div dir='rtl' className='flex justify-start'>

    <h1 className='text-3xl font-bold text-center py-4'>التوجيه المهني</h1>
    </div>
    <div dir='rtl' className=' grid grid-cols-4 gap-4'>
    <div className="bg-gray-50 rounded-md p-6 shadow-md">
  <span className="text-xl font-semibold text-gray-800">تحديد المسار المهني</span>
  <p className="text-gray-600 mt-2">
    ابحث عن توجهات مهنية مختلفة وتعلم كيف تبدأ في مجال جديد يناسبك
  </p>
</div>
    <div className="bg-gray-50 rounded-md p-6 shadow-md">
  <span className="text-xl font-semibold text-gray-800">تحديد المسار المهني</span>
  <p className="text-gray-600 mt-2">
    ابحث عن توجهات مهنية مختلفة وتعلم كيف تبدأ في مجال جديد يناسبك
  </p>
</div>
    <div className="bg-gray-50 rounded-md p-6 shadow-md">
  <span className="text-xl font-semibold text-gray-800">تحديد المسار المهني</span>
  <p className="text-gray-600 mt-2">
    ابحث عن توجهات مهنية مختلفة وتعلم كيف تبدأ في مجال جديد يناسبك
  </p>
</div>
    <div className="bg-gray-50 rounded-md p-6 shadow-md">
  <span className="text-xl font-semibold text-gray-800">تحديد المسار المهني</span>
  <p className="text-gray-600 mt-2">
    ابحث عن توجهات مهنية مختلفة وتعلم كيف تبدأ في مجال جديد يناسبك
  </p>
</div>

    </div>
</div>

<div >
<div dir='rtl' className='flex justify-start'>

<h1 className='text-3xl font-bold text-center py-4'>التوجيه المهني</h1>
</div>

<div dir='rtl' className='flex justify-start'>
<></>
<div class="relative">
  <input type="text" placeholder="Search..." class="w-full p-1.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light" />
  <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
</div>

</div>
        <MentorCard/>
</div>
</div>
    </div>
  )
}

export default Mentrships