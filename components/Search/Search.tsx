import { SearchProps } from "./Search.props";
import styles from "./Search.module.css";
import cn from "classnames";
import { Button, Input } from "..";
import { useState } from "react";
import GlasshIcon from "./glass.svg";
import { useRouter } from "next/router";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>("");

  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key == 'Enter') {
			goToSearch();
		}
	};
  return (
    <div className={cn(className, styles.search)} {...props}>
      <Input
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={goToSearch}
      >
        <GlasshIcon />
      </Button>
    </div>
  );
};
