import React,{useState} from 'react';

const useStore = () => {
    const [isauth,setIsAuth] = useState(false);

    return {isauth,setIsAuth};
};

export default useStore;