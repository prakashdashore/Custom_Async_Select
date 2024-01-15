// Here i declare that i use client side rendering in next-js 
"use client"
import React, { useState, useEffect, useRef } from "react";

// Here interface for my select item
interface SelectItem {
  id: number;
  name: string;
  image: string;
}

// Here Is dummy user data with picture
const userArray: SelectItem[] = [
  {
    id: 1,
    name: "John Doe",
    image: "https://placekitten.com/50/50",
  },
  {
    id: 2,
    name: "Alice Johnson",
    image: "https://placekitten.com/51/51",
  },
  {
    id: 3,
    name: "Bob Smith",
    image: "https://placekitten.com/52/52",
  },
  {
    id: 4,
    name: "Eva Brown",
    image: "https://placekitten.com/53/53",
  },
  {
    id: 5,
    name: "Chris Anderson",
    image: "https://placekitten.com/54/54",
  },
  {
    id: 6,
    name: "Sophie White",
    image: "https://placekitten.com/55/55",
  },
  {
    id: 7,
    name: "Michael Wilson",
    image: "https://placekitten.com/56/56",
  },
  {
    id: 8,
    name: "Olivia Davis",
    image: "https://placekitten.com/57/57",
  },
  {
    id: 9,
    name: "Daniel Miller",
    image: "https://placekitten.com/58/58",
  },
  {
    id: 10,
    name: "Emma Johnson",
    image: "https://placekitten.com/59/59",
  },
  {
    id: 11,
    name: "Ryan Brown",
    image: "https://placekitten.com/60/60",
  },
  {
    id: 12,
    name: "Mia Garcia",
    image: "https://placekitten.com/61/61",
  },
  {
    id: 13,
    name: "David Smith",
    image: "https://placekitten.com/62/62",
  },
  {
    id: 14,
    name: "Ava Taylor",
    image: "https://placekitten.com/63/63",
  },
  {
    id: 15,
    name: "Jason Martinez",
    image: "https://placekitten.com/64/64",
  },
  {
    id: 16,
    name: "Isabella Harris",
    image: "https://placekitten.com/65/65",
  },
  {
    id: 17,
    name: "Justin Brown",
    image: "https://placekitten.com/66/66",
  },
  {
    id: 18,
    name: "Sophia Miller",
    image: "https://placekitten.com/67/67",
  },
  {
    id: 19,
    name: "Christopher Robinson",
    image: "https://placekitten.com/68/68",
  },
  {
    id: 20,
    name: "Emily Davis",
    image: "https://placekitten.com/69/69",
  },
];

// Component declareation 
const CustomAsyncSelect: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [items, setItems] = useState<SelectItem[]>(userArray);
  const [selectedItems, setSelectedItems] = useState<SelectItem[]>([]);
  const [inputClicked, setInputClicked] = useState<boolean>(false); // New state
  const inputRef = useRef<HTMLInputElement | null>(null);

  // use effect for set items in user arrey on basis of input value as we type in input field 
  useEffect(() => {
    const filteredItems = userArray.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setItems(filteredItems);
  }, [inputValue]);

   //Here is I Set inputClicked to true when input is changed
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setInputClicked(true);
  };
 
  // declaretion of handle click for set selected items in use state 
  const handleItemClick = (item: SelectItem) => {
    setSelectedItems([...selectedItems, item]);
    setItems(items.filter((i) => i.id !== item.id));
    setInputValue("");
    inputRef.current?.focus();
  };

  // here is declaretion of remove function for removing added chips in array  
  const handleChipRemove = (item: SelectItem) => {
    setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    setItems([...items, item]);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" &&
      inputValue === "" &&
      selectedItems.length > 0
    ) {
      const lastChip = selectedItems[selectedItems.length - 1];
      handleChipRemove(lastChip);
    }
  };

  // ui part as displayed
  return (
    <div className="async-select-container mx-auto max-w-md p-4 bg-white shadow-md rounded-md">
      <div className="chips-container flex flex-wrap mb-4">
        {selectedItems.map((item) => (
          <div
            key={item.id}
            className="chip bg-gray-200 border border-gray-300 rounded flex items-center p-2 m-1"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-4 h-4 mr-2 rounded-full"
            />
            <span className="chip-label">{item.name}</span>
            <span
              className="chip-remove ml-2 cursor-pointer text-red-500"
              onClick={() => handleChipRemove(item)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type to search..."
        value={inputValue}
        onChange={handleInputChange}
        onClick={() => setInputClicked(true)} // Set inputClicked to true when input is clicked
        onKeyDown={handleInputKeyDown}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {inputClicked && ( // Render user list only if input has been clicked
        <ul className="user-list list-none p-0 m-0">
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="flex items-center p-2 cursor-pointer transition duration-300 hover:bg-gray-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-6 h-6 mr-2 rounded-full"
              />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomAsyncSelect;