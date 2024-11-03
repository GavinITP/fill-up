import { Dispatch, SetStateAction, useState } from "react";
import Tag from "./Tag";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { grey } from "@mui/material/colors";

interface TagAdderProps {
    tags: string[];
    setTags: Dispatch<SetStateAction<string[]>>;
    title?: string;
    placeholder?: string;
}

export default function TagAdder({ tags, setTags, title, placeholder }: TagAdderProps) {
    const [inputValue, setInputValue] = useState('');

    const checkEnterkey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTag();
        }
    };
    const addTag = () => {
        if (inputValue.trim() !== '') {
            setTags([...tags, inputValue]);
            setInputValue('');
        }
    };
    const removeTag = (removedTag: string) => {
        const newTags = tags.filter(
            (tag) => tag !== removedTag
        );
        setTags(newTags);
    };

    return (
        <div className="flex w-full flex-col items-start justify-start gap-1">
            {title && <h6 className="text-lg font-normal text-black">{title}</h6>}
            <div className='flex flex-wrap min-h-30 w-full gap-4 items-center'>
                <div className="w-1/4 relative">
                    <input
                        className="focus:outline-lightblue-200 w-full rounded-lg border border-gray-300 p-3"
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={checkEnterkey}
                    />
                    <button
                        className="absolute right-4 top-4 text-white flex items-center justify-center rounded-full"
                        onClick={addTag}
                    >
                        <AddCircleIcon className="w-5 h-5" style={{ color: grey[500] }} />
                    </button>
                </div>
                <div className="flex flex-row gap-2">
                    {tags?.map((tag, index) => {
                        return (
                            <Tag key={index} color="gray" label={tag} action={() => removeTag(tag)} />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}