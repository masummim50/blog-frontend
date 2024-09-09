import React from 'react';
import ReactQuill from 'react-quill';

const Quill = ({value, setValue}:{value:string, setValue:(value:string)=>void}) => {
    const modules = {
        toolbar: ["bold", "italic", "underline", "link", "code"],
      };
    return (
        <ReactQuill
          className="h-[48vh] bg-white text-black pb-[62px] mt-3 border-black rounded-md outline-none border-none"
          modules={modules}
          theme="snow"
          value={value}
          onChange={setValue}
        />
    );
};

export default Quill;


