import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) { }

    async findAll() {
        return this.bookModel.find().exec();
    }

    async findOne(id: string) {
        return this.bookModel.findById(id).exec();
    }

    async create(createBookDto: CreateBookDto) {
        const book = new this.bookModel(createBookDto);
        return book.save();
    }

    async update(id: string, updateBookDto: UpdateBookDto) {
        const book = await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
            new: true,
        });
        return book;
    }

    async remove(id: string) {
        return this.bookModel.findByIdAndDelete(id);
    }
}