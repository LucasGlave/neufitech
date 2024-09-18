type Entry = {
  frase: string;
  url: string;
};

type CategoryModel = {
  title: string;
  url: string;
  entries: Entry[];
};

type InteractionsArray = CategoryModel[];
