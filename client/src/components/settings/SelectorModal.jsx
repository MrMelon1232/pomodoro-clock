import { useState } from "react";
import { useSettingsContext } from "../../context/useSettingsContext";
import { CarouselButton } from "../ui/buttons/CarouselButton";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export const SelectorModal = () => {
    const { backgrounds, backgroundIndex, setBackgroundIndex } =
        useSettingsContext();

    // Index to temporarily hold the selected background before confirming
    const [tempIndex, setTempIndex] = useState(backgroundIndex);

    const next = () => setTempIndex((i) => (i + 1) % backgrounds.length);
    const prev = () =>
        setTempIndex((i) => (i - 1 + backgrounds.length) % backgrounds.length);

    const apply = () => {
        setBackgroundIndex(tempIndex);
        onclose();
    };

    return (
        <div className="">
            <div className="">
                <CarouselButton onClick={prev} icon={IoIosArrowBack} />
                <span className="">{backgrounds[backgroundIndex].label}</span>

                <CarouselButton onClick={next} icon={IoIosArrowForward} />
            </div>
            <div className="">
                <button onClick={apply}>Apply</button>
            </div>
        </div>
    );
};
