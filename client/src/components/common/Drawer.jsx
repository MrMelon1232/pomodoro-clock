export const Drawer = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-end z-50"
            onClick={onClose}
        >
            <div
                className="
          bg-espresso w-full max-w-md rounded-t-3xl p-6 shadow-xl
          transition-transform duration-300
        "
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-12 h-1 bg-sand/40 rounded-full mx-auto mb-4" />
                {children}
            </div>
        </div>
    );
};
