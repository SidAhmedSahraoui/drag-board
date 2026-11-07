import { FC, useMemo, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Backdrop from "../../images/gradient.png";
import {
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PlusIcon, Squares2X2Icon, TrashIcon } from "@heroicons/react/20/solid";

import { Button, Composer, Input } from "../../components";
import { toast } from "../../components/toast/store";
import { CardView, Container, ContainerView, Items, Modal } from "../../layouts";
import {
  MAX_CARD_TITLE,
  MAX_LIST_TITLE,
  createSampleBoard,
  findContainer,
  usePageTitle,
  useBoardDnd,
  useStore,
} from "../../lib";

type EditingCard = { id: string; title: string; listTitle: string };

const Board: FC = () => {
  usePageTitle("Board · DragBoard");

  const containers = useStore((s) => s.containers);
  const setContainers = useStore((s) => s.setContainers);
  const addContainer = useStore((s) => s.addContainer);
  const renameContainer = useStore((s) => s.renameContainer);
  const deleteContainer = useStore((s) => s.deleteContainer);
  const restoreContainer = useStore((s) => s.restoreContainer);
  const addItem = useStore((s) => s.addItem);
  const editItem = useStore((s) => s.editItem);
  const deleteItem = useStore((s) => s.deleteItem);
  const restoreItem = useStore((s) => s.restoreItem);

  const { sensors, collisionDetection, announcements, active, handlers } = useBoardDnd();

  const boardRef = useRef<HTMLDivElement>(null);
  const [isAddingList, setAddingList] = useState(false);

  const [editing, setEditing] = useState<EditingCard | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const cardCount = useMemo(() => containers.reduce((n, c) => n + c.items.length, 0), [containers]);

  const scrollBoardToEnd = () =>
    requestAnimationFrame(() =>
      boardRef.current?.scrollTo({ left: boardRef.current.scrollWidth, behavior: "smooth" })
    );

  const handleAddList = (title: string) => {
    if (addContainer(title)) scrollBoardToEnd();
  };

  const handleDeleteList = (id: string) => {
    const index = containers.findIndex((c) => c.id === id);
    const list = containers[index];
    if (!list) return;
    deleteContainer(id);
    toast.show({
      message: `Deleted list “${list.title}”`,
      actionLabel: "Undo",
      onAction: () => restoreContainer(list, index),
    });
  };

  const openEditor = (id: string, title: string) => {
    const list = findContainer(containers, id);
    setEditing({ id, title, listTitle: list?.title ?? "" });
    setDraft(title);
    setEditOpen(true);
  };

  const saveEdit = (event: FormEvent) => {
    event.preventDefault();
    if (!editing || !draft.trim() || draft.trim() === editing.title) return;
    editItem(editing.id, draft);
    setEditOpen(false);
  };

  const deleteEditing = () => {
    if (!editing) return;
    const list = findContainer(containers, editing.id);
    const index = list?.items.findIndex((i) => i.id === editing.id) ?? -1;
    const card = list?.items[index];
    setEditOpen(false);
    if (!list || !card) return;
    deleteItem(card.id);
    toast.show({
      message: `Deleted card “${card.title.length > 40 ? card.title.slice(0, 40) + "…" : card.title}”`,
      actionLabel: "Undo",
      onAction: () => restoreItem(list.id, card, index),
    });
  };

  const activeCard = useMemo(() => {
    if (active?.kind !== "item") return undefined;
    return containers.flatMap((c) => c.items).find((i) => i.id === active.id);
  }, [active, containers]);
  const activeList = active?.kind === "container" ? containers.find((c) => c.id === active.id) : undefined;

  const isEmpty = containers.length === 0;
  const canSave = draft.trim().length > 0 && draft.trim() !== editing?.title;

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden">
      <div aria-hidden className="fixed inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${Backdrop})` }} />
      <header className="flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg text-lg font-extrabold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 sm:text-xl"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-red-500 to-violet-600 shadow-lg shadow-red-500/20">
              <Squares2X2Icon className="h-4 w-4 text-white" />
            </span>
            DragBoard
          </Link>
          {!isEmpty && (
            <p className="hidden text-xs font-medium text-slate-400 sm:block">
              {containers.length} {containers.length === 1 ? "list" : "lists"} · {cardCount}{" "}
              {cardCount === 1 ? "card" : "cards"}
            </p>
          )}
        </div>
        <p className="hidden text-xs text-slate-500 lg:block">
          Drag cards between lists · Focus a card and press <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-sans text-slate-300">Space</kbd> to move it with the keyboard
        </p>
      </header>

      <main className="min-h-0 flex-1">
        <DndContext
          sensors={sensors}
          collisionDetection={collisionDetection}
          accessibility={{ announcements }}
          {...handlers}
        >
          <div
            ref={boardRef}
            className="flex h-full snap-x snap-proximity items-start gap-4 overflow-x-auto overflow-y-hidden px-4 pb-6 sm:px-6"
          >
            {isEmpty && !isAddingList && (
              <div className="m-auto flex max-w-sm flex-col items-center gap-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-8 py-10 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-red-500 to-violet-600">
                  <Squares2X2Icon className="h-6 w-6 text-white" />
                </span>
                <div>
                  <h1 className="text-lg font-bold text-white">Your board is empty</h1>
                  <p className="mt-1 text-sm text-slate-400">
                    Create a list to start organizing, or load a sample board to try out dragging.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button icon={<PlusIcon className="h-4 w-4" />} onClick={() => setAddingList(true)}>
                    Create a list
                  </Button>
                  <Button variant="secondary" onClick={() => setContainers(createSampleBoard())}>
                    Load sample board
                  </Button>
                </div>
              </div>
            )}

            <SortableContext items={containers.map((c) => c.id)} strategy={horizontalListSortingStrategy}>
              {containers.map((container) => (
                <Container
                  key={container.id}
                  id={container.id}
                  title={container.title}
                  cardCount={container.items.length}
                  onAddItem={(title) => addItem(container.id, title)}
                  onRename={(title) => renameContainer(container.id, title)}
                  onDelete={() => handleDeleteList(container.id)}
                >
                  <SortableContext items={container.items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                    {container.items.map((item) => (
                      <Items key={item.id} id={item.id} title={item.title} onEdit={() => openEditor(item.id, item.title)} />
                    ))}
                  </SortableContext>
                </Container>
              ))}
            </SortableContext>

            {(!isEmpty || isAddingList) && (
              <div className="w-[min(20rem,85vw)] shrink-0 snap-start">
                {isAddingList ? (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2">
                    <Composer
                      label="New list title"
                      placeholder="Enter list title…"
                      submitLabel="Add list"
                      maxLength={MAX_LIST_TITLE}
                      keepOpen
                      onSubmit={handleAddList}
                      onCancel={() => setAddingList(false)}
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAddingList(true)}
                    className="flex h-12 w-full items-center gap-2 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-4 text-sm font-semibold text-slate-300 transition-colors hover:border-white/30 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add another list
                  </button>
                )}
              </div>
            )}
          </div>

          <DragOverlay adjustScale={false} dropAnimation={{ duration: 180, easing: "cubic-bezier(0.2, 0, 0, 1)" }}>
            {activeCard && <CardView title={activeCard.title} isOverlay />}
            {activeList && (
              <ContainerView title={activeList.title} count={activeList.items.length} isOverlay>
                <div className="flex flex-col gap-2 overflow-hidden px-2 py-1">
                  {activeList.items.slice(0, 6).map((item) => (
                    <CardView key={item.id} title={item.title} />
                  ))}
                </div>
              </ContainerView>
            )}
          </DragOverlay>
        </DndContext>
      </main>

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit card"
        subtitle={editing ? `in list ${editing.listTitle}` : undefined}
      >
        <form onSubmit={saveEdit} className="flex flex-col gap-4">
          <Input
            autoFocus
            label="Title"
            value={draft}
            maxLength={MAX_CARD_TITLE}
            autoComplete="off"
            onFocus={(e) => e.currentTarget.select()}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="flex items-center justify-between gap-3">
            <Button variant="danger" icon={<TrashIcon className="h-4 w-4" />} onClick={deleteEditing}>
              Delete
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!canSave}>
                Save
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Board;
