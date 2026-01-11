export default function NoSearchQuery() {



    return (

    <div className="flex flex-col justify-center items-center min-h-[300px] 
    sm:min-h-[400px] p-6 sm:p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg 
    rounded-2xl shadow-xl dark:shadow-2xl border border-white/20 dark:border-gray-700/30">

        <div className="text-center space-y-2 max-w-lg">
            <h2 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-gray-200">
            No Results Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
            Try a different query
            </p>
        </div>
    </div>

    )
}