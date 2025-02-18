const AuthLayout = ({ children }) => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-black text-white">
            <div className="w-full max-w-sm ">
          {children}
         </div>
      </div>
    );
  };
  
  export default AuthLayout;
  