

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-8 rounded-2xl border border-gray-800">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
          <h2 className="text-xl font-gaming text-primary mt-4">
            Loading Game...
          </h2>
        </div>
      </div>
  )
}

export default Loader