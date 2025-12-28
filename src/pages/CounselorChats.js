import React from 'react';
import Card from '../components/Card';
import { MessageSquare, Video, Phone, Send, User } from 'lucide-react';

const CounselorChats = () => {
    return React.createElement('div', { className: "max-w-7xl mx-auto" },
        React.createElement('h2', { className: "text-2xl sm:text-3xl font-bold text-black dark:text-gray-100 mb-6" }, "Chats & Communication"),
        
        React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-4 gap-6" },
            // Chat List/Sidebar
            React.createElement(Card, { className: "lg:col-span-1 min-h-[500px] p-0 overflow-hidden" },
                React.createElement('h3', { className: "text-xl font-bold text-black dark:text-gray-100 p-6 border-b dark:border-gray-700 flex items-center" },
                    React.createElement(MessageSquare, { className: "w-5 h-5 mr-2 text-blue-500" }), " Inbox"
                ),
                React.createElement('div', { className: "space-y-1 p-3" },
                    React.createElement('div', { className: "flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer rounded-lg" },
                        React.createElement(User, { className: "w-8 h-8 rounded-full mr-3 text-blue-600" }),
                        React.createElement('div', null,
                            React.createElement('p', { className: "font-semibold text-black dark:text-white" }, "Anonymized Student 1"),
                            React.createElement('p', { className: "text-sm text-gray-500 truncate" }, "Last message: Thank you, that was very helpful...")
                        )
                    ),
                    React.createElement('div', { className: "flex items-center p-3 bg-blue-50 dark:bg-slate-800/50 cursor-pointer rounded-lg" },
                        React.createElement(User, { className: "w-8 h-8 rounded-full mr-3 text-blue-600" }),
                        React.createElement('div', null,
                            React.createElement('p', { className: "font-semibold text-black dark:text-white" }, "Anonymized Student 9"),
                            React.createElement('p', { className: "text-sm text-red-500 font-medium" }, "1 unread message")
                        )
                    )
                )
            ),

            // Chat Window
            React.createElement(Card, { className: "lg:col-span-3 min-h-[500px] flex flex-col justify-between" },
                React.createElement('div', { className: "flex justify-between items-center pb-4 border-b dark:border-gray-700" },
                    React.createElement('h3', { className: "text-xl font-bold text-black dark:text-gray-100" }, "Chat with Student 9"),
                    React.createElement('div', { className: "flex space-x-2" },
                        React.createElement('button', { className: "p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300" }, React.createElement(Video, { className: "w-5 h-5 text-blue-600" })),
                        React.createElement('button', { className: "p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300" }, React.createElement(Phone, { className: "w-5 h-5 text-blue-600" }))
                    )
                ),
                
                React.createElement('div', { className: "flex-grow overflow-y-auto p-4 text-center text-gray-500" }, "Start of conversation history..."),

                React.createElement('div', { className: "flex items-center pt-4 border-t dark:border-gray-700" },
                    React.createElement('input', {
                        type: "text",
                        placeholder: "Type a message...",
                        className: "flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white mr-2"
                    }),
                    React.createElement('button', { className: "p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" },
                        React.createElement(Send, { className: "w-5 h-5" })
                    )
                )
            )
        )
    );
};

export default CounselorChats;