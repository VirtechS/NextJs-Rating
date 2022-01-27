import { ReviewFormProps } from "./ReviewForm.props";
import styles from "./ReviewForm.module.css";
import CloseIcon from "./close.svg";
import cn from "classnames";
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "../../helpers/api";
import { useState } from "react";

export const ReviewForm = ({
  productId,
  isOpened,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setIsError("Что-то пошло не так");
      }
    } catch (e) {
      setIsError("Что-то пошло не так");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          tabIndex={isOpened ? 0 : -1}
          {...register("name", {
            required: { value: true, message: "Заполните имя" },
          })}
          placeholder="Имя"
          error={errors.name}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          tabIndex={isOpened ? 0 : -1}
          className={styles.title}
          {...register("title", {
            required: { value: true, message: "Заполните заголовок" },
          })}
          placeholder="Заголовок отзыва"
          error={errors.title}
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: { value: true, message: "Укажите рейтинг" },
            }}
            render={({ field }) => (
              <Rating
                tabIndex={isOpened ? 0 : -1}
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                error={errors.rating}
              />
            )}
          ></Controller>
        </div>
        <Textarea
          tabIndex={isOpened ? 0 : -1}
          {...register("description", {
            required: { value: true, message: "Заполните текст отзыва" },
          })}
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
          aria-label="Текст отзыва"
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button
            tabIndex={isOpened ? 0 : -1}
            appearance="primary"
            onClick={() => clearErrors()}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={styles.success} role="alert">
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <button aria-label="Закрыть оповещение" className={styles.close} onClick={() => setIsSuccess(false)}>
            <CloseIcon/>
          </button>
        </div>
      )}
      {isError && (
        <div className={cn(styles.error, styles.panel)} role="alert">
          Что-то пошло не так, попробуйте обновить страницу
          <button
            onClick={() => setIsError(undefined)}
            className={styles.close}
            aria-label="Закрыть оповещение"
          >
            <CloseIcon
              className={styles.close}
              onClick={() => setIsError(undefined)}
            />
          </button>
        </div>
      )}
    </form>
  );
};
