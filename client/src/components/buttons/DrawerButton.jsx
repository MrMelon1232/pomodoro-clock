export const DrawerButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="fixed bottom-8 right-8 bg-terracotta text-cream rounded-full shadow-lg p-4 hover:bg-terracotta/90 transition"
    >
        <span className="text-xl font-bold">+</span>
    </button>
);
